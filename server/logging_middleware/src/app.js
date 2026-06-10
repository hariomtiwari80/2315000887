import express from "express";
import {
  logger,
  requestLogger,
  errorLogger,
} from "./middlewares/index.js";

const app = express();

app.use(requestLogger);

app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Hello World");
});

app.get("/error", (req, res, next) => {
  next(new Error("Test Error"));
});


app.use(errorLogger);
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
});

app.listen(3000, () => {
  logger.info("Server running on port 3000");
});