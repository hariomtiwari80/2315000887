import axiosInstance from "../config/axiosConfig.js";
import logger from "../middleware/loggerMiddleware.js";

export const getDepots = async () => {
  try {
    const { data } = await axiosInstance.get("/depots");

    if (!data) {
      throw new Error("No depot data received");
    }

    logger.info("Depots fetched successfully");

    return data;
  } catch (error) {
    logger.error("Failed to fetch depots", {
      message: error.message,
    });

    throw error;
  }
};