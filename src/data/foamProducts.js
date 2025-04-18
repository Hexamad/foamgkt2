export const foamProducts = {
  ALL_FOAM: {
    densities: ['9', '18', '23', '28', '32', '40', '50'],
    ratePerMM: {
      '9': 0.0021219136,
      '18': 0.00361,
      '23': 0.00434,
      '28': 0.00477,
      '32': 0.00606,
      '40': 0.00722,
      '50': 0.00848
    }
  },
  LD_FOAM: {
    densities: ['9'],
    ratePerMM: {
      '9': 0.0021219136,
    }
  },
  HR_FOAM: {
    densities: ['32', '40'],
    ratePerMM: {
      '32': 0.0265,
      '40': 0.0334
    }
  },
  SUPER_SOFT: {
    densities: ['24', '28', '32', '40', '40_HR'],
    ratePerMM: {
      '24': 0.013,
      '28': 0.0155,
      '32': 0.017,
      '40': 0.0215,
      '40_HR': 0.0285
    }
  },
  MEMORY_FOAM: {
    densities: ['45', '55'],
    ratePerMM: {
      '45': 0.045,
      '55': 0.055
    }
  }
};