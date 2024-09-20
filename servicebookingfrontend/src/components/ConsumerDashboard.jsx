import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Grid, Divider, IconButton, List, ListItem, ListItemText, ListItemIcon, Container } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Home, Build, LocalFlorist, Star, Kitchen, FitnessCenter, Computer, SportsGolf } from '@mui/icons-material';
import { setSelectedCategory, setSelectedService } from '../redux/actions/categoryActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import images for services and advertisements
import serviceImage1 from './electrician.jpg';
import serviceImage2 from './electrician1.jpg';
import serviceImage3 from './electrician2.png';
import adImage1 from './adver1.jpg';
import adImage2 from './adver7.jpg';
import adImage4 from './adver4.jpg';
import adImage5 from './adver5.jpg';
import adVideo from './ad-video1.mp4'; // Import your video file

// Array of icons for categories with color styling
const categoryIcons = [
  <Home sx={{ color: '#2f4b6e' }} />,
  <Build sx={{ color: '#2f4b6e' }} />,
  <LocalFlorist sx={{ color: '#2f4b6e' }} />,
  <Star sx={{ color: '#2f4b6e' }} />,
  <Kitchen sx={{ color: '#2f4b6e' }} />,
  <FitnessCenter sx={{ color: '#2f4b6e' }} />,
  <Computer sx={{ color: '#2f4b6e' }} />,
  <SportsGolf sx={{ color: '#2f4b6e' }} />
];

const serviceImages = [serviceImage1, serviceImage2, serviceImage3];
const adImages = [adImage1, adImage2, adVideo, adImage4, adImage5]; // Include video in the adImages array

const ConsumerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [categorySelected, setCategorySelected] = useState(false);

  const categories = useSelector((state) => state.categories.categories || []);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const services = useSelector((state) => state.categories.selectedCategory?.services || []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    setCategorySelected(true);
    setTabIndex(1);
  };

  const handleServiceClick = (service) => {
    dispatch(setSelectedService(service));
    navigate(`/providers/${service._id}`);
  };

  const handleBackClick = () => {
    setTabIndex(0);
    setCategorySelected(false);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '2rem' }}>
      <Grid container spacing={3}>
        {tabIndex === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ padding: '1.5rem', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', backgroundColor: '#fafafa' }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, color: '#2f4b6e' }}>
                  Explore Categories
                </Typography>
                <Divider sx={{ marginBottom: '1.5rem', borderColor: '#e0e0e0' }} />
                <Grid container spacing={3}>
                  {categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={12} key={category._id}>
                      <Box
                        sx={{
                          cursor: 'pointer',
                          padding: '1rem',
                          borderRadius: '8px',
                          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                          },
                        }}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <ListItem>
                          <ListItemIcon>
                            {categoryIcons[index % categoryIcons.length]}
                          </ListItemIcon>
                          <ListItemText primary={category.name} sx={{ fontWeight: 600, color: '#2f4b6e' }} />
                        </ListItem>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                {adImages.map((adImage, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      height: '200px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
                      '&:nth-of-type(odd)': {
                        gridColumn: 'span 2',
                      },
                      '&:nth-of-type(even)': {
                        gridRow: 'span 2',
                      },
                      ...(index === 2 && {
                        gridColumn: 'span 4', // Increase the width of the third item
                        width: '151%',
                        height: '100%',
                      }),
                    }}
                  >
                    {index === 2 ? (
                      <video
                        src={adImage}
                        autoPlay
                        muted
                        loop
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          border: 'none', // Ensure no border
                          outline: 'none', // Ensure no outline
                          display: 'block', // Ensure no extra space below the video
                        }}
                      />
                    ) : (
                      <img
                        src={adImage}
                        alt={`Advertisement ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    >
                      {/* Text removed */}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}

        {tabIndex === 1 && selectedCategory && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ padding: '1.5rem', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', backgroundColor: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <IconButton onClick={handleBackClick} aria-label="Back to categories">
                    <ChevronLeft sx={{ color: '#2f4b6e' }} />
                  </IconButton>
                  <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, fontWeight: 700, color: '#2f4b6e' }}>
                    Services in {selectedCategory.name}
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: '1rem', borderColor: '#e0e0e0' }} />
                <List>
                  {services.map((service, index) => (
                    <ListItem button key={service._id} onClick={() => handleServiceClick(service)}>
                      <img
                        src={serviceImages[index % serviceImages.length]}
                        alt={service.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '1rem',
                        }}
                      />
                      <ListItemText
                        primary={service.name}
                        secondary={service.description}
                        sx={{ flexGrow: 1, color: '#2f4b6e' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ConsumerDashboard;
