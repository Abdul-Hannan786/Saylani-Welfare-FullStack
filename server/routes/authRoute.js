import express from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/authController.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-token", verifyToken);
router.post("/logout", logout);

export default router;
