import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(decoded).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in user route", error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET);
    } catch (error) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(decoded);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.json({ success: false, message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in user route", error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};
