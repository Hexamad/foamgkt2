import { foamProducts } from '../data/foamProducts';

export const unitConversions = {
  mm: 1,
  cm: 10,
  inch: 25.4,
  feet: 304.8
};

export const densityRates = {
  '9': 0.305555556,
  '18': 0.00361,
  '23': 0.00434,
  '28': 0.00477,
  '32': 0.00606,
  '40': 0.00722,
  '50': 0.00848,
  '55': 0.00900,
  '60': 0.00950,
  '65': 0.01000,
  '70': 0.01050,
  '75': 0.01100,
  '80': 0.01150,
  '90': 0.01200,
  '100': 0.01250,
  '110': 0.01300,
  '24': 0.00500,
  '28': 0.00550,
  '32': 0.00600,
  '40': 0.00700,
  '40HR': 0.00750
};

export const calculatePrice = (dimensions, thickness, density, quantity = 1, selectedUnit = 'mm', foamType = 'ALL_FOAM') => {
  // Validate inputs
  if (!dimensions?.length || !dimensions?.width || !thickness || !density) return 0;
  
  // Convert dimensions to inches
  const lengthMM = dimensions.length * unitConversions[selectedUnit];
  const widthMM = dimensions.width * unitConversions[selectedUnit];
  const lengthInches = lengthMM / 25.4;
  const widthInches = widthMM / 25.4;
  
  // Calculate area in square inches
  const area = lengthInches * widthInches;
  
  // Get rate based on foam type and density
  let rate;
  switch (foamType) {
    case 'REBONDED':
      rate = densityRates[density] || 0;
      break;
    case 'MEMORY_FOAM':
    case 'GEL_MEMORY_FOAM':
      rate = foamProducts.MEMORY_FOAM.ratePerMM[density] || 0;
      break;
    case 'CONVULATED':
      rate = foamProducts.ALL_FOAM.ratePerMM[density] || 0;
      break;
    default:
      rate = foamProducts[foamType]?.ratePerMM[density] || 0;
  }
  
  // Calculate final price
  const price = area * thickness * rate * quantity;
  return Math.round(price);
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = calculatePrice(
      item.dimensions,
      item.thickness,
      item.density,
      item.quantity,
      item.unit,
      item.foamType
    );
    return total + itemPrice;
  }, 0);
};