import React, { useRef, useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, IconButton, Box, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2pdf from 'html2pdf.js';
import { calculatePrice, calculateTotalPrice } from '../utils/calculations';

function Cart({ cartItems, removeFromCart, onClose, customerInfo, updateCustomerInfo }) {
  const pdfRef = useRef();

  const generatePDF = async () => {
    const element = pdfRef.current;
    const opt = {
      margin: [1, 1, 2, 1],
      filename: customerInfo.referenceNumber 
        ? `GurukrupaTraders-${customerInfo.referenceNumber}.pdf` 
        : 'GurukrupaTraders-Estimator.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF as blob instead of directly saving
    const pdfBlob = await html2pdf().from(element).set(opt).output('blob');
    
    // Create file from blob
    const pdfFile = new File([pdfBlob], opt.filename, { type: 'application/pdf' });

    // Check if Web Share API is supported and can share files
    if (navigator.share && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          title: 'Gurukrupa Traders Estimate',
          text: 'Please find attached estimate from Gurukrupa Traders'
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          // Fallback to direct download
          html2pdf().from(element).set(opt).save();
        }
      }
    } else {
      // Fallback for browsers that don't support sharing
      html2pdf().from(element).set(opt).save();
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (Number(item.totalPrice) || 0), 0).toFixed(2);
  };

  return (
    <Box>
      <Box ref={pdfRef}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/images/gktLogo.png" 
              alt="Gurukrupa Traders Logo" 
              style={{ width: '60px', marginRight: '20px' }}
            />
            <Typography variant="h5">
              <Box component="span" sx={{ color: 'red', fontWeight: 'bold' }}>
                Gurukrupa
              </Box>{' '}
              <Box component="span" sx={{ color: 'darkblue', fontWeight: 'bold' }}>
                Traders
              </Box>
              {' - Estimator/Price Calculator'}
            </Typography>
          </Box>
          {customerInfo.referenceNumber && (
            <Typography variant="h6" color="primary">
              Ref: {customerInfo.referenceNumber}
            </Typography>
          )}
        </Box>

        {/* Add Customer Information Section */}
        {(customerInfo.name || customerInfo.phone || customerInfo.address) && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f8f8', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Customer Information</Typography>
            <Grid container spacing={2}>
              {customerInfo.name && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Name:</strong> {customerInfo.name}
                  </Typography>
                </Grid>
              )}
              {customerInfo.phone && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {customerInfo.phone}
                  </Typography>
                </Grid>
              )}
              {customerInfo.address && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Address:</strong> {customerInfo.address}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

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