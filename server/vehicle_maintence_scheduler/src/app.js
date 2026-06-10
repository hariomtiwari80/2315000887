import express from "express";
import schedulerRoutes from "./routes/schedulerRoutes.js";
import { requestLogger, errorLogger } from "./middleware/loggerMiddleware.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", schedulerRoutes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
});

export default app;