import React from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, IconButton, Box, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function Cart({ cartItems, removeFromCart, onClose }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo
    const logo = new Image();
    logo.src = '/images/gktLogo.png';
    doc.addImage(logo, 'PNG', 10, 10, 30, 30);

    // Add title
    doc.setFontSize(18);
    doc.text('Gurukrupa Traders - Order Summary', 50, 20);

    // Add table using autoTable directly
    autoTable(doc, {
      startY: 40,
      head: [['Product', 'Dimensions', 'Thickness', 'Density', 'Quantity', 'Price']],
      body: cartItems.map(item => [
        item.name,
        `${item.dimensions.length}x${item.dimensions.width} ${item.unit}`,
        `${item.thickness}mm`,
        item.density,
        item.quantity,
        `₹${item.totalPrice}`
      ]),
      theme: 'grid',
      styles: { fontSize: 10 }
    });

    // Add total
    doc.setFontSize(14);
    doc.text(`Total: ₹${calculateTotal()}`, 10, doc.lastAutoTable.finalY + 20);

    // Save and share
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // WhatsApp sharing
    const whatsappUrl = `https://wa.me/919604003322?text=Here's%20my%20order%20summary%20from%20Gurukrupa%20Traders&attachment=${pdfUrl}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Dimensions</TableCell>
              <TableCell>Thickness</TableCell>
              <TableCell>Density</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.dimensions.length}x{item.dimensions.width} {item.unit}</TableCell>
                <TableCell>{item.thickness}mm</TableCell>
                <TableCell>{item.density}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.totalPrice}</TableCell>
                <TableCell>
                  <IconButton 
                    color="error" 
                    onClick={() => removeFromCart(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Total: ₹{calculateTotal()}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PictureAsPdfIcon />}
          onClick={generatePDF}
        >
          Share via WhatsApp
        </Button>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ mr: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;