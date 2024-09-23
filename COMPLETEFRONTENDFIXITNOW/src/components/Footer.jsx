import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { Facebook, YouTube, Instagram, LinkedIn } from '@mui/icons-material';
import logo from './footerLogo.png'; // Update with the actual path to your logo

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#e7f1f4', color: '#2f4b6e', padding: '1rem 0' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack items on small screens
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
      >
        <img
          src={logo}
          alt="Company Logo"
          style={{ height: '250px', width: '300px', margin: { xs: '0 auto', md: '0 -10px -40px 0' } }} // Center logo on mobile
        />

        <Box sx={{ textAlign: { xs: 'center', md: 'right' }, marginTop: { xs: '1rem', md: '0' } }}>
          <Typography variant="body2">
            <a href="/privacy" style={{ color: '#2f4b6e', textDecoration: 'none' }}>Privacy Policy</a> |
            <a href="/terms" style={{ color: '#2f4b6e', textDecoration: 'none' }}> Terms of Service</a>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' }, // Center icons on small screens
              marginTop: { xs: '0.5rem', md: '0' },
            }}
          >
            <Typography variant="body2">Connect with us at: </Typography>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              color="inherit"
              sx={{
                transition: 'transform 0.3s ease, color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                  color: '#3b5998', // Facebook color
                },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://youtube.com"
              target="_blank"
              color="inherit"
              sx={{
                transition: 'transform 0.3s ease, color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                  color: '#FF0000', // YouTube color
                },
              }}
            >
              <YouTube />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              color="inherit"
              sx={{
                transition: 'transform 0.3s ease, color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                  color: '#C13584', // Instagram color
                },
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              color="inherit"
              sx={{
                transition: 'transform 0.3s ease, color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                  color: '#0077B5', // LinkedIn color
                },
              }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
        <Typography variant="body2">© {new Date().getFullYear()} FixItNow Services. All rights reserved.</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
