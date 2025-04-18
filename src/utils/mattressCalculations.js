export const calculateMattressPrice = (dimensions, thickness, density, ratePerMM) => {
  // Convert dimensions to meters and maintain precision
  const length = parseFloat((dimensions.length / 100));
  const width = parseFloat((dimensions.width / 100));
  
  // Calculate area in square meters
  const area = length * width;
  
  // Calculate price using rate per mm
  const price = area * thickness * ratePerMM;
  
  // Return price with 4 decimal places without rounding
  return parseFloat(price.toFixed(4));
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = calculateMattressPrice(
      item.dimensions,
      item.thickness,
      item.density,
      item.ratePerMM
    );
    const itemTotal = itemPrice * item.quantity;
    return parseFloat((total + itemTotal).toFixed(4));
  }, 0);
};