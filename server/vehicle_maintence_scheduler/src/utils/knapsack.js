export const optimizeMaintenanceSchedule = (
  vehicles,
  mechanicHours
) => {
  const n = vehicles.length;

  const dp = Array.from(
    { length: n + 1 },
    () => Array(mechanicHours + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const duration = vehicles[i - 1].duration;
    const impact = vehicles[i - 1].impact;

    for (let h = 0; h <= mechanicHours; h++) {
      if (duration <= h) {
        dp[i][h] = Math.max(
          dp[i - 1][h],
          impact + dp[i - 1][h - duration]
        );
      } else {
        dp[i][h] = dp[i - 1][h];
      }
    }
  }

  const selectedVehicles = [];
  let h = mechanicHours;

  for (let i = n; i > 0; i--) {
    if (dp[i][h] !== dp[i - 1][h]) {
      selectedVehicles.push(vehicles[i - 1]);
      h -= vehicles[i - 1].duration;
    }
  }

  selectedVehicles.reverse();

  const totalDuration = selectedVehicles.reduce(
    (sum, vehicle) => sum + vehicle.duration,
    0
  );

  return {
    totalImpact: dp[n][mechanicHours],
    totalDuration,
    selectedVehicles,
  };
};

export default optimizeMaintenanceSchedule;