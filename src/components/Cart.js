import React, { useRef } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, IconButton, Box, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2pdf from 'html2pdf.js';
import { calculatePrice, calculateTotalPrice } from '../utils/calculations';

function Cart({ cartItems, removeFromCart, onClose }) {
  const pdfRef = useRef();

  const generatePDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: [1, 1, 2, 1], // Increased bottom margin for footer
      filename: 'GurukrupaTraders-OrderSummary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (Number(item.totalPrice) || 0), 0);
  };

  return (
    <Box>
      <Box ref={pdfRef}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <img 
            src="/images/gktLogo.png" 
            alt="Gurukrupa Traders Logo" 
            style={{ width: '60px', marginRight: '20px' }}
          />
          <Typography variant="h5">Gurukrupa Traders - Order Summary</Typography>
        </Box>

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
                {!pdfRef.current && <TableCell>Action</TableCell>}
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
                  {!pdfRef.current && (
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => removeFromCart(index)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6">
            Total: ₹{getTotalPrice()}
          </Typography>
        </Box>

        {/* Add Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: '1px solid #ccc',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            Contact: +91-9665559941
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Website: https://gurukrupatrader.com
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sr. No. 132, Paladiya Industrial Estate, Western Express Highway, Phata, 
            Vasai East, Vasai- Virar, Pelhar, Maharashtra 401208
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PictureAsPdfIcon />}
          onClick={generatePDF}
        >
          Download PDF
        </Button>
        <Button 
          variant="outlined" 
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default Cart;