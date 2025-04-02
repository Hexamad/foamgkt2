import { foamProducts } from '../data/foamProducts';

export const densityRates = {
  '9': 0.00361,
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
  // Add specific rates for Super Soft Foam
  '24': 0.00500,
  '28': 0.00550,
  '32': 0.00600,
  '40': 0.00700,
  '40HR': 0.00750
};

export const unitConversions = {
  mm: 1,
  cm: 10,
  inch: 25.4,
  feet: 304.8
};

export const calculatePrice = (dimensions, thickness, density, quantity, selectedUnit, foamType = 'ALL_FOAM') => {
  // Validate inputs
  if (!dimensions.length || !dimensions.width || !thickness || !density) return 0;
  
  // Convert dimensions to inches
  const lengthInches = (dimensions.length * unitConversions[selectedUnit]) / 25.4;
  const widthInches = (dimensions.width * unitConversions[selectedUnit]) / 25.4;
  
  // Calculate area in square inches
  const area = lengthInches * widthInches;
  
  // Get density rate from foamProducts
  const rate = foamProducts[foamType]?.ratePerMM[density] || densityRates[density] || 0;
  
  // Calculate final price
  const price = area * thickness * rate * quantity;
  return Math.round(price);
};