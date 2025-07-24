import express from "express";
import { getAllUsers, testMiddleware } from "../controllers/userController.js";
import { authenticateAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/test", authenticateAdmin, testMiddleware);

export default router;
