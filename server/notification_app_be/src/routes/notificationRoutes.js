import { Router } from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = Router();

router.post("/notifications", createNotification);

router.get("/notifications", getNotifications);

router.patch(
  "/notifications/:id/read",
  markAsRead
);

router.delete(
  "/notifications/:id",
  deleteNotification
);

export default router;