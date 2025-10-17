import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, cnic } = req.body;
    if (!name || !email || !password || !cnic) {
      return res.json({
        success: false,
        message: "Please provide all the details",
      });
    }

    const isExistingUser = await User.findOne({ cnic });
    if (isExistingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cnic,
    });

    const token = jwt.sign({ _id: newUser._id }, process.env.AUTH_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      success: true,
      message: "User created successfully",
      user: { _id: newUser._id, name, email, cnic, role: newUser.role },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { password, cnic } = req.body;
    if (!password || !cnic) {
      return res.json({
        success: false,
        message: "Please provide all the details",
      });
    }

    const user = await User.findOne({ cnic });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({
      success: true,
      message: "Login successfull",
      user: { _id: user._id, email:user.email, cnic, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({
        success: false,
        message: "No token found in cookies",
      });
    }

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const user = await User.findOne({ _id: decoded._id }).select("-password");

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
