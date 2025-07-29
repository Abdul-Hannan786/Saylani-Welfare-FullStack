import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);


export default router;
