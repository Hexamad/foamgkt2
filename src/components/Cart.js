import React from 'react';
import { 
  Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import html2pdf from 'html2pdf.js';

function Cart({ cartItems, onClose }) {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const generatePDF = () => {
    const element = document.getElementById('invoice-content');
    const opt = {
      margin: 1,
      filename: 'foam-invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Cart Items</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <div id="invoice-content">
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" color="secondary.main" gutterBottom>
            Gurukrupa Traders
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Foam Products Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Dimensions</TableCell>
                <TableCell>Thickness</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {`${item.dimensions.length} × ${item.dimensions.width} ${item.unit}`}
                  </TableCell>
                  <TableCell>{`${item.thickness}mm`}</TableCell>
                  <TableCell align="right">₹{item.totalPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <strong>Total Amount:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>₹{totalAmount}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={generatePDF}
          disabled={cartItems.length === 0}
        >
          Generate Invoice
        </Button>
      </Box>
    </div>
  );
}

export default Cart;