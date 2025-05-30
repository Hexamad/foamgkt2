import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton, Badge, Modal, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Products from './components/Products';
import Cart from './components/Cart';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  // Add customer information state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    referenceNumber: ''
  });

  // Generate a reference number when adding first item to cart
  const addToCart = (product, foamType) => {
    const newItems = [...cartItems, {
      ...product,
      foamType: foamType,
      unit: 'inch'  // Set default unit to inch
    }];
    
    setCartItems(newItems);
    
    // Generate reference number if this is the first item and no reference exists
    if (newItems.length === 1 && !customerInfo.referenceNumber) {
      const today = new Date();
      const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const refNumber = `GKT2025-${today.getMonth()+1}${today.getDate()}-${randomNum}`;
      
      setCustomerInfo(prev => ({
        ...prev,
        referenceNumber: refNumber
      }));
    }
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Add function to update customer information
  const updateCustomerInfo = (info) => {
    setCustomerInfo(prev => ({
      ...prev,
      ...info
    }));
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: 2
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'secondary.main' }}>
          <Toolbar>
            <img 
              src="/images/gktLogo.png" 
              alt="Company Logo" 
              style={{ width: '50px', marginRight: '10px' }} 
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <span style={{ color: 'red' }}>Gurukrupa</span>{' '}
              <span style={{ color: '#00008b' }}>Traders</span>
            </Typography>
            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* Spacing for fixed AppBar */}
        <Container sx={{ py: 4 }}>
          <Products addToCart={addToCart} updateCustomerInfo={updateCustomerInfo} customerInfo={customerInfo} />
          <Modal
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Box sx={modalStyle}>
              <Cart 
                cartItems={cartItems} 
                removeFromCart={removeFromCart} 
                onClose={() => setCartOpen(false)} 
                customerInfo={customerInfo}
                updateCustomerInfo={updateCustomerInfo}
              />
            </Box>
          </Modal>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;