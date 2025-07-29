import { uploadToCloudinary } from "../config/cloudinary.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
