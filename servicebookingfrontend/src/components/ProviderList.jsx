import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Box,
  CardActions,
  Divider,
  Rating
} from '@mui/material';

const ProviderList = () => {
  const { serviceId } = useParams();
  const [providers, setProviders] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const navigate = useNavigate();

  // Fetch providers based on the selected serviceId
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/providers?serviceId=${serviceId}`);
        setProviders(response.data);
        const serviceResponse = await axios.get(`http://localhost:3000/api/services/${serviceId}`);
        setServiceName(serviceResponse.data.name);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, [serviceId]);

  // Handle provider selection and navigate to the booking component
  const handleProviderSelect = (provider) => {
    navigate('/booking', { state: { provider } });
  };

  return (
    <Box sx={{ padding: '2rem', minHeight: '100vh' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: '#2f4b6e',
          textAlign: 'center',
          marginBottom: '2rem',
          background: 'linear-gradient(to right, #2f4b6e, #4a6b8c)', // Updated gradient
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Providers for {serviceName}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {providers.map((provider) => {
          const matchedService = provider.services.find(
            (serviceItem) => serviceItem.service._id === serviceId
          );

          // Ensure averageRating is a number and handle edge cases
          const averageRating = Number(provider.averageRating) || 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={provider._id}>
              <Card
                sx={{
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  },
                  maxWidth: 320,
                  background: '#ffffff', // White background
                }}
              >
                <CardContent sx={{ padding: '20px' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          background: 'linear-gradient(to right, #2f4b6e, #4a6b8c)', // Gradient for avatar
                          color: '#fff',
                          fontSize: '1.2rem',
                        }}
                      >
                        {provider.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: '#2f4b6e',
                        }}
                      >
                        {provider.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {provider.mobile}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ marginY: 2 }} />

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#555',
                      fontWeight: 500,
                    }}
                  >
                    {matchedService && `Price: ₹${matchedService.price}`}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 1,
                    }}
                  >
                    <Rating
                      value={averageRating}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                    <Typography variant="caption" sx={{ marginLeft: 1 }}>
                      {averageRating.toFixed(1)} / 5
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', padding: '10px 20px' }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleProviderSelect(provider)}
                    sx={{
                      background: 'linear-gradient(to right, #2f4b6e, #4a6b8c)', // Updated gradient button
                      textTransform: 'none',
                      borderRadius: '25px',
                      padding: '6px 16px',
                      '&:hover': {
                        background: 'linear-gradient(to right, #4a6b8c, #2f4b6e)',
                      },
                    }}
                  >
                    Reserve Provider
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProviderList;
