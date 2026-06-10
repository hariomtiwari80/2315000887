import axiosInstance from "../config/axiosConfig.js";
import logger from "../middleware/loggerMiddleware.js";

export const getVehicles = async () => {
  try {
    const { data } = await axiosInstance.get("/vehicles");

    if (!data) {
      throw new Error("No vehicle data received");
    }

    logger.info("Vehicles fetched successfully", {
      count: Array.isArray(data) ? data.length : undefined,
    });

    return data;
  } catch (error) {
    logger.error("Failed to fetch vehicles", {
      message: error.message,
      statusCode: error.response?.status,
    });

    throw error;
  }
};