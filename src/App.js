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

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Gurukrupa Traders
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
          <Products addToCart={addToCart} />
          <Modal
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Box sx={modalStyle}>
              <Cart cartItems={cartItems} onClose={() => setCartOpen(false)} />
            </Box>
          </Modal>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;