exports.getSimulatedTemperature = (location, date) => {
  // Simple deterministic pseudo-random logic
  const seed = location.length + new Date(date).getDate();
  const temp = (seed % 30) - 5; // range: -5 to 24
  return temp;
};
