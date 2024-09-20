import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Grid, Paper, Divider, Box, CircularProgress, Snackbar, Alert, Card, CardContent, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { updateCartCount, addBookingDetails } from '../redux/actions/cartActions';
import CartIcon from './CartIcon';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import BuildIcon from '@mui/icons-material/Build';
import bg from './booknowbg.png';

const BookingComponent = () => {
  const location = useLocation();
  const { provider } = location.state || {};
  const dispatch = useDispatch();
  const [consumerName, setConsumerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [startDateTime, setStartDateTime] = useState(''); // Start date and time state
  const [endDateTime, setEndDateTime] = useState(''); // End date and time state
  const consumerDetails = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (consumerDetails) {
      setConsumerName(consumerDetails.username);
    }
  }, [consumerDetails]);

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const selectedService = useSelector((state) => state.categories.selectedService);

  const handleBookService = async () => {
    const bookingData = {
      provider: provider?._id,
      consumer: consumerDetails._id,
      category: selectedCategory?._id,
      service: selectedService?._id,
      timeslot: [ startDateTime, endDateTime ], // Include start and end date-times
    };
    
    const bookingDataDetails = {
      provider: provider?.username,
      consumer: consumerDetails.username,
      category: selectedCategory?.name,
      service: selectedService?.name,
      timeSlot: { start: startDateTime, end: endDateTime },
    };

    console.log(bookingData)

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/booking', bookingData);

      if (response.status === 201) {
        dispatch(updateCartCount(1));
        dispatch(addBookingDetails(bookingDataDetails));
        setBookingConfirmed(true);
        setSuccess(true);
      }
    } catch (error) {
      setError('Failed to book the service. Please try again.');
      console.error('Error booking the service:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            height: '100vh',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper
          elevation={10}
          sx={{
            width: '100%',
            height: '100%',
            p: 5,
            borderRadius: '0px',
            background: 'linear-gradient(135deg, #f0f4f7, #e0e7ee)',
            boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <CartIcon active={bookingConfirmed} />

          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, mb: 4, color: '#2f4b6e' }}>
            Service Booking Overview
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Card elevation={4} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <PersonIcon fontSize="large" sx={{ color: '#2f4b6e' }} />
                  <Typography variant="h6" gutterBottom>
                    Provider
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {provider?.username || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card elevation={4} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <PersonIcon fontSize="large" sx={{ color: '#2f4b6e' }} />
                  <Typography variant="h6" gutterBottom>
                    Consumer
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {consumerName || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Card elevation={4} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <CategoryIcon fontSize="large" sx={{ color: '#2f4b6e' }} />
                  <Typography variant="h6" gutterBottom>
                    Category
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {selectedCategory?.name || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card elevation={4} sx={{ borderRadius: '8px' }}>
                <CardContent>
                  <BuildIcon fontSize="large" sx={{ color: '#2f4b6e' }} />
                  <Typography variant="h6" gutterBottom>
                    Service
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {selectedService?.name || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Date and Time Selection */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Choose Start Date & Time"
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                variant="outlined"
                sx={{ mb: 4 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Choose End Date & Time"
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                variant="outlined"
                sx={{ mb: 4 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={loading || !startDateTime || !endDateTime} // Disable if loading or no date-times are selected
              onClick={handleBookService}
              sx={{
                minWidth: 200,
                backgroundColor: '#2f4b6e',
                color: '#fff',
                boxShadow: '0px 8px 20px rgba(47, 75, 110, 0.2)',
                borderRadius: '30px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#4b6e9e',
                  transform: 'scale(1.03)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Book Now'}
            </Button>
          </Box>
        </Paper>

        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Booking Confirmed!
          </Alert>
        </Snackbar>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default BookingComponent;
