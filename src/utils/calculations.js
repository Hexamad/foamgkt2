import { foamProducts } from '../data/foamProducts';

export const unitConversions = {
  mm: 1,
  cm: 10,
  inch: 25.4,
  feet: 304.8
};

// export const densityRates = {
//   '9': 0.0021219136,
//   '18': 0.00361,
//   '23': 0.00434,
//   '28': 0.00477,
//   '32': 0.00606,
//   '40': 0.00722,
//   '50': 0.00848,
//   '55': 0.00900,
//   '60': 0.00950,
//   '65': 0.01000,
//   '70': 0.01050,
//   '75': 0.01100,
//   '80': 0.01150,
//   '90': 0.01200,
//   '100': 0.01250,
//   '110': 0.01300,
//   '24': 0.00500,
//   '28': 0.00550,
//   '32': 0.00600,
//   '40': 0.00700,
//   '40HR': 0.00750
// };

export const calculatePrice = (dimensions, thickness, density, quantity = 1, selectedUnit = 'mm', foamType = 'ALL_FOAM') => {
  // Validate inputs
  if (!dimensions?.length || !dimensions?.width || !thickness || !density) return 0;
  
  // Convert dimensions to inches with precision
  const lengthMM = parseFloat((dimensions.length * unitConversions[selectedUnit]).toFixed(4));
  const widthMM = parseFloat((dimensions.width * unitConversions[selectedUnit]).toFixed(4));
  const lengthInches = parseFloat((lengthMM / 25.4).toFixed(4));
  const widthInches = parseFloat((widthMM / 25.4).toFixed(4));
  
  // Calculate area in square inches
  const area = parseFloat((lengthInches * widthInches).toFixed(4));
  
  // Get rate based on foam type and density
  let rate;
  switch (foamType) {
    case 'ALL_FOAM':
      rate = foamProducts.ALL_FOAM.ratePerMM[density] || 0;
      break;
    case 'LD_FOAM':
      rate = foamProducts.LD_FOAM.ratePerMM[density] || 0;
      break;
    case 'HD_FOAM':
      rate = foamProducts.HD_FOAM.ratePerMM[density] || 0;
      break;
    case 'REBONDED_FOAM':
      rate = foamProducts.REBONDED_FOAM.ratePerMM[density] || 0;
      break;
    case 'HR_FOAM':
      rate = foamProducts.HR_FOAM.ratePerMM[density] || 0;
      break;
    case 'SUPER_SOFT':
      rate = foamProducts.SUPER_SOFT.ratePerMM[density] || 0;
      break;
    case 'MEMORY_FOAM':
      rate = foamProducts.MEMORY_FOAM.ratePerMM[density] || 0;
      break;
    case 'GELMEMORY_FOAM':
      rate = foamProducts.GELMEMORY_FOAM.ratePerMM[density] || 0;
      break;
    case 'EPE_SHEET':
      rate = foamProducts.EPE_SHEET.ratePerMM[density] || 0;
      break;
    default:
      rate = 0;
  }
  
  // Calculate final price and round to 2 decimals
  const price = area * thickness * rate * quantity;
  return parseFloat(price.toFixed(2));
};

export const calculateTotalPrice = (cartItems) => {
  return parseFloat(cartItems.reduce((total, item) => {
    if (item.totalPrice) {
      return parseFloat((total + item.totalPrice).toFixed(2));
    }
    
    // Fallback calculation if totalPrice is not available
    const dimensions = item.dimensions;
    const thickness = item.thickness;
    const density = item.density;
    const quantity = item.quantity || 1;
    const unit = item.unit || 'mm';
    
    return parseFloat((total + calculatePrice(dimensions, thickness, density, quantity, unit, item.foamType)).toFixed(2));
  }, 0).toFixed(2));
};