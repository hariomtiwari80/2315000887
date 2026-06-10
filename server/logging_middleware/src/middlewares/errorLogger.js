import logger from "./logger.js";

const errorLogger = (err, req, res, next) => {
  logger.error("Application Error", {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
  });

  next(err);
};

export default errorLogger;