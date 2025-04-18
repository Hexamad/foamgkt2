export const calculateMattressPrice = (dimensions, thickness, density) => {
  // Convert dimensions to meters
  const length = (dimensions.length / 100).toFixed(4);
  const width = (dimensions.width / 100).toFixed(4);
  
  // Convert thickness to meters
  const thicknessInM = (thickness / 1000).toFixed(4);
  
  // Calculate volume in cubic meters
  const volume = (length * width * thicknessInM).toFixed(4);
  
  // Density is in kg/m³
  const weight = (volume * density).toFixed(4);
  
  // Price per kg (you may want to make this configurable)
  const pricePerKg = 250;
  
  return Number((weight * pricePerKg).toFixed(4));
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = calculateMattressPrice(
      item.dimensions,
      item.thickness,
      item.density
    );
    return Number((total + (itemPrice * item.quantity)).toFixed(4));
  }, 0);
};