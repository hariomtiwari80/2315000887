import { Router } from "express";
import { getSchedule } from "../controllers/schedulerController.js";

const router = Router();

router.get("/schedule", getSchedule);

export default router;