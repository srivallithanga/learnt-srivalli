// Navbar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Book, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../navbarLogo.png'; // Update with the actual path to your logo

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user info if necessary
    navigate('/login'); // Redirect to login after logout
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isConsumer = user.role === 'consumer';

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2f4b6e' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="Company Logo" style={{ height: '60px', width: '160px' }} /> {/* Adjust size as needed */}
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        {isLoggedIn && (
          <IconButton color="inherit" onClick={() => navigate('/bookings')}>
            <Book />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {isLoggedIn && isConsumer ? (
            <>
              <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>User Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
