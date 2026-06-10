import winston from "winston";

const { combine, timestamp, json, colorize, simple } =
  winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: combine(
    timestamp(),
    json()
  ),

  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize(),
        simple()
      ),
    })
  );
}

export const requestLogger = (
  req,
  res,
  next
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    logger.info("HTTP Request", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${Date.now() - startTime}ms`,
      ip: req.ip,
    });
  });

  next();
};

export const errorLogger = (
  err,
  req,
  res,
  next
) => {
  logger.error("Application Error", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
  });

  next(err);
};

export default logger;