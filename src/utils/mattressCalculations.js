export const calculateMattressPrice = (dimensions, thickness, density) => {
  // Convert dimensions to meters
  const length = dimensions.length / 100;
  const width = dimensions.width / 100;
  
  // Convert thickness to meters
  const thicknessInM = thickness / 1000;
  
  // Calculate volume in cubic meters
  const volume = length * width * thicknessInM;
  
  // Density is in kg/m³
  const weight = volume * density;
  
  // Price per kg (you may want to make this configurable)
  const pricePerKg = 250;
  
  return Math.round(weight * pricePerKg);
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = calculateMattressPrice(
      item.dimensions,
      item.thickness,
      item.density
    );
    return total + (itemPrice * item.quantity);
  }, 0);
};