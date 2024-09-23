// Navbar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../navbarLogo.png'; // Update with the actual path to your logo

const ProviderNavbar = () => {
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
  const isProvider = user.role === 'provider';

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2f4b6e' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="Company Logo" style={{ height: '60px', width: '160px' }} />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {isLoggedIn && isProvider ? (
            <>
              <MenuItem onClick={() => navigate(`/provider/${user._id}`)}>User Profile</MenuItem>
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

export default ProviderNavbar;
