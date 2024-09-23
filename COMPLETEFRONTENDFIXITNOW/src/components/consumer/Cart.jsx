import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Card, CardContent, Button, Snackbar, IconButton, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import {updateConsumerAddress, fetchConsumerDetails} from '../../redux/actions/consumerActions'
const Cart = () => {
  const dispatch = useDispatch();
  const bookingDetails = useSelector((state) => state.cart.bookingDetails);
  const consumerAddress = useSelector((state) => state.consumer.address);
  const consumerId = JSON.parse(localStorage.getItem('user'));

  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(consumerAddress || '');
  const navigate = useNavigate();

  const handlePayment = () => {
    // Handle payment logic

    // Show snackbar message
    setSnackbarOpen(true);
    setCashOnDelivery(false);
    navigate('/');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddressEdit = () => {
    setNewAddress(consumerAddress); // Set the current address in the text field
    setEditingAddress(true);
  };

  const handleAddressSave = () => {
    if (consumerId) {
      dispatch(updateConsumerAddress(consumerId._id, newAddress));
    }
    setEditingAddress(false);
  };

  useEffect(() => {
    if (consumerId) {
      dispatch(fetchConsumerDetails(consumerId._id));
    }
  }, [dispatch, consumerId]);

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: 'auto', backgroundColor: '#f4f6f9', borderRadius: 4, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700, color: '#2f4b6e' }}>
        Booking Summary
      </Typography>

      {bookingDetails ? (
        <Box sx={{ mb: 3, borderRadius: 2, p: 2, background: 'linear-gradient(135deg, #e4eaf2, #c6d4e0)', boxShadow: 2 }}>
          <Typography variant="h6" sx={{ color: '#2f4b6e', mb: 1 }}>Provider: <strong>{bookingDetails.provider}</strong></Typography>
          <Typography variant="h6" sx={{ color: '#2f4b6e', mb: 1 }}>Consumer: <strong>{bookingDetails.consumer}</strong></Typography>
          <Typography variant="h6" sx={{ color: '#2f4b6e', mb: 1 }}>Category: <strong>{bookingDetails.category}</strong></Typography>
          <Typography variant="h6" sx={{ color: '#2f4b6e' }}>Service: <strong>{bookingDetails.service}</strong></Typography>
        </Box>
      ) : (
        <Typography sx={{ mb: 3, color: '#2f4b6e' }}>No booking details available.</Typography>
      )}

      <Divider sx={{ my: 4, borderColor: '#b0bec5', borderWidth: 2 }} />

      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 700, color: '#2f4b6e' }}>
        Address
      </Typography>
      {editingAddress ? (
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
            variant="outlined"
            sx={{
              mb: 2,
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                borderColor: '#2f4b6e',
                boxShadow: '0 0 5px rgba(47, 75, 110, 0.5)',
              },
              borderColor: '#c5cae9',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddressSave}
            sx={{
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#2c387e',
                transform: 'scale(1.05)',
              },
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              backgroundColor: '#2f4b6e',
            }}
          >
            <EditIcon sx={{ mr: 1 }} /> Save Address
          </Button>
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          {consumerAddress ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 2, color: '#2f4b6e' }}>{consumerAddress}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddressEdit}
                sx={{
                  transition: 'border-color 0.3s ease, color 0.3s ease',
                  '&:hover': {
                    borderColor: '#2f4b6e',
                    color: '#2f4b6e',
                  },
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 2,
                  borderColor: '#2f4b6e',
                  color: '#2f4b6e',
                }}
              >
                <EditIcon sx={{ mr: 1 }} /> Edit Address
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddressEdit}
              sx={{
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#2c387e',
                  transform: 'scale(1.05)',
                },
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#2f4b6e',
              }}
            >
              <AddIcon sx={{ mr: 1 }} /> Add Address
            </Button>
          )}
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Service Booked"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
            sx={{ '&:hover': { color: '#2f4b6e' } }}
          >
            <CloseIcon />
          </IconButton>
        }
        sx={{ transition: 'opacity 0.3s ease' }}
      />

      <Divider sx={{ my: 4, borderColor: '#b0bec5', borderWidth: 2 }} />

      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 700, color: '#2f4b6e' }}>
        Payment Options
      </Typography>
      <Card
        sx={{
          mb: 2,
          cursor: 'pointer',
          boxShadow: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          background: '#ffffff',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.02)',
          },
          padding: 2,
        }}
        onClick={() => setCashOnDelivery(!cashOnDelivery)}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: '#2f4b6e' }}>Cash on Delivery</Typography>
          <Typography variant="body2" sx={{ color: cashOnDelivery ? '#388e3c' : '#d32f2f' }}>
            {cashOnDelivery ? 'Selected' : 'Not Selected'}
          </Typography>
        </CardContent>
      </Card>

      <Button
  variant="contained"
  color="primary"
  onClick={handlePayment}
  disabled={!cashOnDelivery || !consumerAddress} // Disable button if no address or COD is not selected
  sx={{
    borderRadius: 2,
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: '#2c387e',
      transform: 'scale(1.05)',
    },
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2f4b6e',
  }}
>
  <PaymentIcon sx={{ mr: 1 }} /> Make Payment
</Button>

    </Box>
  );
};

export default Cart;
