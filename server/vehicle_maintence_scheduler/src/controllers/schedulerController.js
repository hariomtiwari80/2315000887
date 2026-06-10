import { generateSchedule } from "../services/schedulerService.js";

export const getSchedule = async (req, res, next) => {
  try {
    const result = await generateSchedule();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};