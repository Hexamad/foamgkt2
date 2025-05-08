import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, CardMedia, Typography, Button,
  FormControl, InputLabel, Select, MenuItem, TextField, Paper,
  Box, Divider
} from '@mui/material';

import { calculatePrice, unitConversions } from '../utils/calculations';
import { foamProducts } from '../data/foamProducts';  // Add this import

const products = [
  {
    id: 1,
    name: 'White LD PU Foam',
    // Removed basePrice
    image: 'https://5.imimg.com/data5/XF/AM/SG/NSDMERP-56297551/image-1000x1000.jpeg',
    thicknessOptions: [2,3,4,5,6,7,8,9,10,12,15,18,19,20,21,25,30,35,40,45, 50,70, 75,80,85,90,95, 100,125, 150, 200, 250],
    category: 'Mattress Raw Materials',
    density: '9 density, 18 density, 23 density'
  },
  {
    id: 2,
    name: 'HD PU Foam',
    // basePrice: 250,
    image: 'https://makerbazar.in/cdn/shop/products/high-density-pu-foam-500x500.webp?v=1681727081&width=500',
    thicknessOptions: [2,3, 4,  5, 6, 7, 8, 9 ,10,12,15,18,19, 20,21, 25, 30,35, 40,45, 50,70, 75,80,85,90,95, 100,125, 150, 200, 250],
    category: 'Mattress Raw Materials',
    density: '28, 32, 40, 50'
  },
  {
    id: 3,
    name: 'Rebonded Foam Sheet',
    // basePrice: 80,
    image: 'https://5.imimg.com/data5/AO/VM/HT/SELLER-6371482/bonded-foam-sheets-500x500.jpg',
    thicknessOptions: [12,15,18,19,20,21,22,23,24,25,30,35,40,45,48,50,55,60,65,70,75,80,85,90,95,98, 100,110,115,120,125,150],
    category: 'Mattress Raw Materials',
    density: '80, 90, 100, 110'
  },
  //
  {
    id: 4,
    name: 'Super Soft Foam',
    // basePrice: 60,
    image: 'https://5.imimg.com/data5/RA/FY/MY-56919196/super-soft-foam-sheet.jpg',
    thicknessOptions: [2,3,4,5,6,7,8,9,10,12,15,18,19, 20,21, 25, 30,35, 40,45, 50,70, 75,80,85,90,95, 100,125, 150, 200, 250],
    category: 'Mattress Raw Materials',
    density: '24, 28, 32, 40, 41'
  },
  {
    id: 5,
    name: 'Memory Foam Sheets',
    // basePrice: 120,
    image: 'https://tiimg.tistatic.com/fp/1/007/209/white-color-memory-foam-sheets-263.jpg',
    thicknessOptions: [20,25, 30, 35,40, 45,50,60,70, 75,80,85,90,95, 100,125, 150],
    category: 'Mattress Raw Materials',
    density: '45, 55, 65'
  },
  {
    id: 6,
    name: 'Gel Memory Foam Sheets',
    // basePrice: 180,
    image: 'https://m.media-amazon.com/images/I/81LvYefzOFL._SL1500_.jpg',
    thicknessOptions: [20,25, 30, 35,40, 45,50,60,70, 75,80,85,90,95, 100,125, 150],
    category: 'Mattress Raw Materials',
    density: '45, 55, 65'
  },
  {
    id: 7,
    name: 'Natural LATEX SHEET',
    // basePrice: 90,
    image: 'https://5.imimg.com/data5/ANDROID/Default/2020/9/HH/UG/DH/44643334/product-jpeg-500x500.png',
    thicknessOptions: [12,18,25,50,75,100,150],
    category: 'Mattress Raw Materials',
    density: 'one side pin core - 75 Density, two side pin core - 75 Density'
  },
  {
    id: 8,
    name: 'Natural LATEX 7 ZONE SHEETS',
    // basePrice: 90,
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/341157692/MM/LX/YE/141117433/zero-foam-flex-mattress-1000x1000.jpeg',
    thicknessOptions: [50,100,150],
    category: 'Mattress Raw Materials',
    density: '75'
  },
  {
    id: 9,
    name: 'Rubberized Coir Sheet',
    // basePrice: 150,
    image: 'https://www.sughana.com/image/products/rubberized-coir-sheet.jpg',
    thicknessOptions: [12,15,18, 21, 25, 50, 75, 100,125],
    category: 'Mattress Raw Materials',
    density: '70, 80, 90, 100, 110'
  },
  {
    id: 10,
    name: 'HR Foam',
    // basePrice: 150,
    image: 'https://lh3.googleusercontent.com/d/1f8X2nqJvAgHpWJpf_OfTGHzrp7M2gA4U=s220?authuser=0',
    thicknessOptions: [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 19, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85, 90, 100, 125, 150],
    category: 'Mattress Raw Materials',
    density: '30, 40, 50, 60'
  },
  {
    id: 11,
    name: 'Fire Retardant Foam (FR FOAM)',
    // basePrice: 150,
    image: 'https://cpimg.tistatic.com/04540749/b/4/Fire-Retardant-Foam.jpg',
    thicknessOptions: [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 19, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85, 90, 100, 125, 150],
    category: 'Mattress Raw Materials',
    density: '30, 40, 50, 60'
  },
  {
    id: 12,
    name: 'Convulated Foam',
    // basePrice: 150,
    image: 'https://5.imimg.com/data5/ANDROID/Default/2021/4/EF/QY/TW/169569/product-jpeg-500x500.jpg',
    thicknessOptions: [40,45,50, 60,70,75, 80, 85, 90, 100, 125, 150],
    category: 'Mattress Raw Materials',
    density: '30, 40, 50'
  },
  {
    id: 13,
    name: 'EPE SHEETS (Hitlon)',
    // basePrice: 150,
    image: 'https://m.media-amazon.com/images/I/718+Jl14oOL.jpg',
    thicknessOptions: [15, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    category: 'Mattress Raw Materials',
    density: '18'
  }
];

// Add quantity state
// Update the function signature to accept the new props
function Products({ addToCart, updateCustomerInfo, customerInfo }) {
  const [selectedUnit, setSelectedUnit] = useState('inch');  // Changed default to 'inch'
  const [productDimensions, setProductDimensions] = useState({});
  const [productThickness, setProductThickness] = useState({});
  const [selectedDensities, setSelectedDensities] = useState({});
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFoamType, setSelectedFoamType] = useState('ALL_FOAM'); // Add this line
  
  // Add local state for customer info
  const [localCustomerInfo, setLocalCustomerInfo] = useState(customerInfo);
  
  // Update local state when props change
  useEffect(() => {
    setLocalCustomerInfo(customerInfo);
  }, [customerInfo]);
  
  // Handle customer info changes
  const handleCustomerInfoChange = (field, value) => {
    const updatedInfo = { ...localCustomerInfo, [field]: value };
    setLocalCustomerInfo(updatedInfo);
    updateCustomerInfo(updatedInfo);
  };

  const updateDimensions = (productId, field, value) => {
    setProductDimensions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId] || { length: '', width: '' },
        [field]: value
      }
    }));
  };

  const updateDensity = (productId, value) => {
    setSelectedDensities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const updateThickness = (productId, value) => {
    setProductThickness(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  // In the Products component function
  const updateQuantity = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleFoamTypeChange = (productId, value) => {
    setSelectedFoamType(value);
    // Reset density when foam type changes
    setSelectedDensities(prev => ({
      ...prev,
      [productId]: ''
    }));
  };

  const calculatePriceForProduct = (productId) => {
    const dimensions = productDimensions[productId] || { length: '', width: '' };
    const thickness = productThickness[productId];
    const quantity = quantities[productId] || 1;
    const density = selectedDensities[productId];
    
    // Map product IDs to their correct foam types
    let foamType;
    switch (productId) {
      case 1:
        foamType = 'LD_FOAM';
        break;
      case 2:
        foamType = 'ALL_FOAM';
        break;
      case 3:
        foamType = 'REBONDED_FOAM';
        break;
      case 4:
        foamType = 'SUPER_SOFT';
        break;
      case 5:
        foamType = 'MEMORY_FOAM';
        break;
      case 6:
        foamType = 'GEL_MEMORY_FOAM';
        break;
      case 7:
        foamType = 'LATEX';
        break;
      case 8:
        foamType = 'EPE';
        break;
      case 9:
        foamType = 'CONVULATED';
        break;
      case 10:
        foamType = 'HR_FOAM';
        break;
      case 11:
        foamType = 'HD_FOAM';
        break;
      default:
        foamType = 'ALL_FOAM';
    }

    if (!dimensions.length || !dimensions.width || !thickness || !density) return 0;
    
    const lengthMM = dimensions.length * unitConversions[selectedUnit];
    const widthMM = dimensions.width * unitConversions[selectedUnit];
    const lengthInches = lengthMM / 25.4;
    const widthInches = widthMM / 25.4;
    const area = lengthInches * widthInches;
    
    // Get rate from foamProducts based on foam type and density
    const rate = foamProducts[foamType]?.ratePerMM[density] || 0;
    
    const price = area * thickness * rate * quantity;
    return parseFloat(price.toFixed(4));  // Changed from Math.round(price)
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {/* Header section */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'white', color: 'white' }}>
          <Typography variant="h4" align="center" gutterBottom>
            <Box display="flex" alignItems="center" justifyContent="center">
              <img 
                src="/images/gktLogo.png" 
                alt="Company Logo" 
                style={{ width: '50px', marginRight: '10px' }} 
              />
              <span style={{ color: '#ff0000' }}>Gurukrupa</span>{' '}
              <span style={{ color: '#00008b' }}>Traders</span>
            </Box>
          </Typography>
          
          // In the Customer Information Form section, add buttons after the form fields
          
          {/* Customer Information Form - Added before search bar */}
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
              Customer Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Customer Name"
                  fullWidth
                  value={localCustomerInfo.name}
                  onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={localCustomerInfo.phone}
                  onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Address"
                  fullWidth
                  value={localCustomerInfo.address}
                  onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                  variant="outlined"
                  multiline
                  rows={1}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
            </Grid>
            
            {/* Add Save and Clear buttons */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  // Save functionality is already handled by the state updates
                  // Just provide visual feedback
                  alert('Customer information saved!');
                }}
              >
                Save Details
              </Button>
              <Button 
                variant="outlined" 
                color="error"
                onClick={() => {
                  // Clear all customer information
                  updateCustomerInfo({
                    name: '',
                    phone: '',
                    address: '',
                    referenceNumber: ''
                  });
                }}
              >
                Clear Details
              </Button>
            </Box>
            
            {customerInfo.referenceNumber && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Reference Number: <span style={{ color: '#1976d2' }}>{customerInfo.referenceNumber}</span>
                </Typography>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2, bgcolor: 'white' }}
            InputProps={{
              style: {
                backgroundColor: 'white'
              }
            }}
          />

          {/* Rest of the component remains unchanged */}
          <FormControl 
            fullWidth 
            sx={{ 
              bgcolor: 'white', 
              borderRadius: 1,
              '& .MuiInputLabel-root': {
                bgcolor: 'white',
                px: 1,
                borderRadius: '4px'
              },
              '& .MuiSelect-select': {
                bgcolor: 'white'
              }
            }}
          >
            <InputLabel>Select Measurement Unit</InputLabel>
            <Select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <MenuItem value="inch">Inch</MenuItem>
              <MenuItem value="feet">Feet</MenuItem>
              <MenuItem value="mm">Millimeter (mm)</MenuItem>
              <MenuItem value="cm">Centimeter (cm)</MenuItem>
              
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {/* Products grid - remains unchanged */}
      {filteredProducts.map((product) => { // Changed from products to filteredProducts
        const dimensions = productDimensions[product.id] || { length: '', width: '' };
        const thickness = productThickness[product.id] || '';
        const quantity = quantities[product.id] || 1;

        return (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              {/* Card content */}
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.density ? `Density: ${product.density}` : `Type: ${product.type}`}
                </Typography>
                
                {/* Input fields */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {/* Length and width fields */}
                  <Grid item xs={6}>
                    <TextField
                      label={`Length (${selectedUnit})`}
                      type="number"
                      fullWidth
                      value={dimensions.length}
                      onChange={(e) => updateDimensions(product.id, 'length', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={`Width (${selectedUnit})`}
                      type="number"
                      fullWidth
                      value={dimensions.width}
                      onChange={(e) => updateDimensions(product.id, 'width', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Quantity field */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => updateQuantity(product.id, Math.max(1, (quantities[product.id] || 1) - 1))}
                        sx={{ minWidth: '40px', height: '40px' }}
                      >
                        -
                      </Button>
                      <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 1 : Math.max(1, parseInt(e.target.value) || 1);
                          updateQuantity(product.id, val);
                        }}
                        variant="outlined"
                        InputProps={{ 
                          inputProps: { 
                            min: 1,
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <Button 
                        variant="outlined"
                        size="small"
                        onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) + 1)}
                        sx={{ minWidth: '40px', height: '40px' }}
                      >
                        +
                      </Button>
                    </Box>
                  </Grid>

                  {product.density && (
                    <Grid item xs={6}>
                      <TextField
                        select
                        label="Density"
                        fullWidth
                        value={selectedDensities[product.id] || ''}
                        onChange={(e) => updateDensity(product.id, e.target.value)}
                        variant="outlined"
                      >
                        {product.density.split(', ').map((den) => (
                          <MenuItem key={den} value={den}>{den}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  )}
                
                  <Grid item xs={product.density ? 6 : 12}>
                    <TextField
                      select
                      label="Thickness (mm)"
                      fullWidth
                      value={thickness}
                      onChange={(e) => updateThickness(product.id, e.target.value)}
                      variant="outlined"
                    >
                      {product.thicknessOptions.map((t) => (
                        <MenuItem key={t} value={t}>{t}mm</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
    
                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Total Price: ₹{calculatePriceForProduct(product.id)}  
                </Typography>
    
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => addToCart({
                    ...product,
                    dimensions: dimensions,
                    thickness: thickness,
                    density: selectedDensities[product.id],
                    quantity: quantity,
                    unit: selectedUnit,
                    totalPrice: calculatePriceForProduct(product.id)
                  }, selectedFoamType)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Products;