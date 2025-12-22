exports.calculateFinalPrice = (basePrice, temperature) => {
  const diff = Math.abs(temperature - 21);

  if (diff < 2) return basePrice;
  if (diff < 5) return basePrice * 1.1;
  if (diff < 10) return basePrice * 1.2;
  if (diff < 20) return basePrice * 1.3;
  return basePrice * 1.5;
};
