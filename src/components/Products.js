import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, CardMedia, Typography, Button,
  FormControl, InputLabel, Select, MenuItem, TextField, Paper
} from '@mui/material';

const products = [
  {
    id: 1,
    name: 'White LD PU Foam',
    basePrice: 100,
    image: 'https://5.imimg.com/data5/XF/AM/SG/NSDMERP-56297551/image-1000x1000.jpeg',
    thicknessOptions: [2,3,4,5,6,7,8,9,10,12,15,18,19,20,21,25,30,35,40,45, 50,70, 75,80,85,90,95, 100,125, 150, 200, 250],
    category: 'Mattress Raw Materials',
    density: '9'
  },
  {
    id: 2,
    name: 'HD PU Foam',
    basePrice: 250,
    image: 'https://makerbazar.in/cdn/shop/products/high-density-pu-foam-500x500.webp?v=1681727081&width=500',
    thicknessOptions: [2,3, 4,  5, 6, 7, 8, 9 ,10,12,15,18,19, 20,21, 25, 30,35, 40,45, 50,70, 75,80,85,90,95, 100,125, 150, 200, 250],
    category: 'Mattress Raw Materials',
    density: '28, 32, 40, 50'
  },
  {
    id: 3,
    name: 'Rebonded Foam Sheet',
    basePrice: 80,
    image: 'https://5.imimg.com/data5/AO/VM/HT/SELLER-6371482/bonded-foam-sheets-500x500.jpg',
    thicknessOptions: [12,15,18,19,20,21, 22,23,24, 25,30,35,40,45,48, 50,55,60,65,70, 75,80,85,90,95,98, 100,110,115,120,125,150],
    category: 'Mattress Raw Materials',
    density: '80, 90, 100, 110'
  },
  //
  {
    id: 4,
    name: 'Super Soft Foam',
    basePrice: 60,
    image: 'https://5.imimg.com/data5/RA/FY/MY-56919196/super-soft-foam-sheet.jpg',
    thicknessOptions: [2,3, 4,  5, 6, 7, 8, 9 ,10,12,15,18,19, 20,21, 25, 30,35, 40,45, 50,70, 75,80,85,90,95, 100,125, 150, 200, 250],
    category: 'Mattress Raw Materials',
    density: '24, 28, 32, 40, 40HR'
  },
  {
    id: 5,
    name: 'Memory Foam Sheets',
    basePrice: 120,
    image: 'https://tiimg.tistatic.com/fp/1/007/209/white-color-memory-foam-sheets-263.jpg',
    thicknessOptions: [20,25, 30, 35,40, 45,50,60,70, 75,80,85,90,95, 100,125, 150],
    category: 'Mattress Raw Materials',
    density: '45, 55, 65'
  },
  {
    id: 6,
    name: 'Gel Memory Foam Sheets',
    basePrice: 180,
    image: 'https://m.media-amazon.com/images/I/81LvYefzOFL._SL1500_.jpg',
    thicknessOptions: [20,25, 30, 35,40, 45,50,60,70, 75,80,85,90,95, 100,125, 150],
    category: 'Mattress Raw Materials',
    density: '45, 55, 65'
  },
  {
    id: 7,
    name: 'Natural LATEX SHEET',
    basePrice: 90,
    image: 'https://5.imimg.com/data5/ANDROID/Default/2020/9/HH/UG/DH/44643334/product-jpeg-500x500.png',
    thicknessOptions: [12,18,25,50,75,100,150],
    category: 'Mattress Raw Materials',
    density: 'one side pin core - 75 Density, two side pin core - 75 Density'
  },
  {
    id: 8,
    name: 'Natural LATEX 7 ZONE SHEETS',
    basePrice: 90,
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/9/341157692/MM/LX/YE/141117433/zero-foam-flex-mattress-1000x1000.jpeg',
    thicknessOptions: [50,100,150],
    category: 'Mattress Raw Materials',
    density: '75'
  },
  {
    id: 9,
    name: 'Rubberized Coir Sheet',
    basePrice: 150,
    image: 'https://www.sughana.com/image/products/rubberized-coir-sheet.jpg',
    thicknessOptions: [12,15,18, 21, 25, 50, 75, 100,125],
    category: 'Mattress Raw Materials',
    density: '70, 80, 90, 100, 110'
  },
  {
    id: 10,
    name: 'HR Foam',
    basePrice: 150,
    image: 'https://lh3.googleusercontent.com/d/1f8X2nqJvAgHpWJpf_OfTGHzrp7M2gA4U=s220?authuser=0',
    thicknessOptions: [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 19, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85, 90, 100, 125, 150],
    category: 'Mattress Raw Materials',
    density: '30, 40, 50, 60'
  },
  {
    id: 11,
    name: 'Fire Retardant Foam (FR FOAM)',
    basePrice: 150,
    image: 'https://cpimg.tistatic.com/04540749/b/4/Fire-Retardant-Foam.jpg',
    thicknessOptions: [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 19, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 85, 90, 100, 125, 150],
    category: 'Mattress Raw Materials',
    density: '30, 40, 50, 60'
  },
  {
    id: 12,
    name: 'Convulated Foam',
    basePrice: 150,
    image: 'https://5.imimg.com/data5/ANDROID/Default/2021/4/EF/QY/TW/169569/product-jpeg-500x500.jpg',
    thicknessOptions: [40,45,50, 60,70,75, 80, 85, 90, 100, 125, 150],
    category: 'Mattress Raw Materials',
    density: '30, 40, 50'
  },
  {
    id: 13,
    name: 'EPE SHEETS (Hitlon)',
    basePrice: 150,
    image: 'https://m.media-amazon.com/images/I/718+Jl14oOL.jpg',
    thicknessOptions: [15, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    category: 'Mattress Raw Materials',
    density: '18, 23, 28'
  }
];

const unitConversions = {
  mm: 1,
  cm: 10,
  inch: 25.4,
  feet: 304.8
};

function Products({ addToCart }) {
  const [selectedUnit, setSelectedUnit] = useState('mm');
  const [productDimensions, setProductDimensions] = useState({});
  const [productThickness, setProductThickness] = useState({});
  const [selectedDensities, setSelectedDensities] = useState({});

  const updateDensity = (productId, value) => {
    setSelectedDensities(prev => ({
      ...prev,
      [productId]: value
    }));
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

  const updateThickness = (productId, value) => {
    setProductThickness(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const calculatePrice = (productId, basePrice) => {
    const dimensions = productDimensions[productId] || { length: '', width: '' };
    const thickness = productThickness[productId];

    if (!dimensions.length || !dimensions.width || !thickness) return basePrice;
    const area = (dimensions.length * dimensions.width * unitConversions[selectedUnit]) / 1000000;
    return Math.round(basePrice * area * (thickness/10));
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'secondary.main', color: 'white' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Gurukrupa Traders
          </Typography>
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
              <MenuItem value="mm">Millimeter (mm)</MenuItem>
              <MenuItem value="cm">Centimeter (cm)</MenuItem>
              <MenuItem value="inch">Inch</MenuItem>
              <MenuItem value="feet">Feet</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Grid>

      {products.map((product) => {
        const dimensions = productDimensions[product.id] || { length: '', width: '' };
        const thickness = productThickness[product.id] || '';
        
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
                  Base Price: ₹{product.basePrice}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.density ? `Density: ${product.density}` : `Type: ${product.type}`}
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
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
                  Total Price: ₹{calculatePrice(product.id, product.basePrice)}
                </Typography>
    
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  sx={{ 
                    mt: 'auto',
                    textTransform: 'none',
                    py: 1.5
                  }}
                  onClick={() => addToCart({
                    ...product,
                    dimensions: dimensions,
                    thickness: thickness,
                    density: selectedDensities[product.id],
                    unit: selectedUnit,
                    totalPrice: calculatePrice(product.id, product.basePrice)
                  })}
                  disabled={!dimensions.length || !dimensions.width || !thickness || !selectedDensities[product.id]}
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