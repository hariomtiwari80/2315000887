import express from "express";
import notificationRoutes from "./routes/notificationRoutes.js";
import {
  requestLogger,
  errorLogger,
} from "./middleware/loggerMiddleware.js";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus Notification Service Running",
  });
});

app.use("/api/notifications", notificationRoutes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;