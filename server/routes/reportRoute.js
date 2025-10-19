import express from "express";
import { getAllReports, getRecentReports, getReportById, getTimeline, uploadReport } from "../controllers/reportController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.get("/recent", authenticateUser, getRecentReports);
router.get("/:id", authenticateUser, getReportById);
router.get("/", authenticateUser, getAllReports);
router.get("/timeline/all", authenticateUser, getTimeline);
router.post("/upload", authenticateUser, upload.single("file"), uploadReport);

export default router;