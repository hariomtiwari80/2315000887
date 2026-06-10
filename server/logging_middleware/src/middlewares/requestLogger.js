import logger from "./logger.js";

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    logger.info("HTTP Request", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};

export default requestLogger;