
import express from "express";;

import { authenticateUser } from "../middleware/authMiddleware.js";
import { addVitals, getVitals } from "../controllers/vitalController.js";

const router = express.Router();

router.post("/", authenticateUser, addVitals);
router.get("/", authenticateUser, getVitals);

export default router;
