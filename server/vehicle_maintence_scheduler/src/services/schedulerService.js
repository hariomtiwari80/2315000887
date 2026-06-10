import { getDepots } from "./depotService.js";
import { getVehicles } from "./vehicleService.js";
import  optimizeMaintenanceSchedule  from "../utils/knapsack.js";
import logger from "../middleware/loggerMiddleware.js";

export const generateSchedule = async () => {
  try {
    const depots = await getDepots();
    const vehicles = await getVehicles();

    const depotVehiclesMap = depots.map((depot) => ({
    depotId: depot.id,
    depotName: depot.name,
    mechanicHours: depot.mechanicHours,
    vehicles: vehicles.filter(
        (vehicle) => vehicle.depotId === depot.id
    ),
    }));

    const schedule = depotVehiclesMap.map((depot) => ({
      depotId: depot.depotId,
      depotName: depot.depotName,
      mechanicHours: depot.mechanicHours,
      scheduledVehicles: optimizeMaintenanceSchedule(depot.vehicles, depot.mechanicHours),
    }));

    logger.info("Maintenance schedule generated successfully");

    return {
      success: true,
      totalDepots: depots.length,
      totalVehicles: vehicles.length,
      schedule,
    };
  } catch (error) {
    logger.error("Failed to generate maintenance schedule", {
      message: error.message,
    });

    throw error;
  }
};