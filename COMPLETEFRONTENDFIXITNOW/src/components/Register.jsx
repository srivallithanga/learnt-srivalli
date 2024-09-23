import React, { useState } from 'react';
import { Button, Typography, Container, Slide, Card, CardContent, Box } from '@mui/material';
import RegisterConsumer from './RegisterConsumer';
import RegisterProvider from './RegisterProvider';
import bg from './reggif2.jpg';

const Register = () => {
  const [isConsumer, setIsConsumer] = useState(true); // Default to consumer registration
  const [showForm, setShowForm] = useState(true);

  const handleConsumerClick = () => {
    setShowForm(false);
    setIsConsumer(true);
  };

  const handleProviderClick = () => {
    setShowForm(false);
    setIsConsumer(false);
  };

  // Trigger showing the form after state has changed
  const handleTransitionEnd = () => {
    setShowForm(true);
  };

  return (
    <Container sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', marginTop: '-50px' }}>
      <Box 
        sx={{ 
          marginTop: 4,
          backgroundImage: `url(${bg})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          padding: 2, 
          height: '1200px'
        }}
      >
        <Card 
          sx={{ 
            padding: 4, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            height: "1100px"
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Button
                size="small"
                color={isConsumer ? 'primary' : 'default'}
                onClick={handleConsumerClick}
                sx={{ 
                  transition: '0.3s', 
                  '&:hover': { backgroundColor: '#2f4b6e', color: 'white' },
                  backgroundColor: isConsumer ? '#2f4b6e' : 'white',
                  color: isConsumer ? 'white' : '#2f4b6e',
                  width: '100px',
                  marginRight: '10px',
                }}
              >
                Consumer
              </Button>
              <Button
                size="small"
                color={!isConsumer ? 'primary' : 'default'}
                onClick={handleProviderClick}
                sx={{ 
                  transition: '0.3s', 
                  '&:hover': { backgroundColor: '#2f4b6e', color: 'white' },
                  backgroundColor: !isConsumer ? '#2f4b6e' : 'white',
                  color: !isConsumer ? 'white' : '#2f4b6e',
                  width: '100px',
                }}
              >
                Provider
              </Button>
            </div>

            <Box sx={{ position: 'relative', height: 'auto', overflow: 'hidden' }}>
              <Slide direction="up" in={showForm} onExited={handleTransitionEnd} timeout={200}>
                <div>
                  {isConsumer ? <RegisterConsumer /> : <RegisterProvider />}
                </div>
              </Slide>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
