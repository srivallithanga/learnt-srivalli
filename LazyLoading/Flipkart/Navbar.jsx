import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  const handleBack = () => {
    setActiveSection(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          {activeSection ? (
            <>
              <IconButton edge="start" color="inherit" onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {activeSection === 'admin' ? 'Admin' : 'Home'}
              </Typography>
              {activeSection === 'admin' && (
                <>
                  <Button color="inherit" component={Link} to="/admin/addproducts">
                    Add Products
                  </Button>
                  <Button color="inherit" component={Link} to="/admin/addusers">
                    Add Users
                  </Button>
                </>
              )}
              {activeSection === 'home' && (
                <>
                  <Button color="inherit" component={Link} to="/home/showproducts">
                    Show Products
                  </Button>
                  <Button color="inherit" component={Link} to="/home/showusers">
                    Show Users
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleNavigate('home')}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleNavigate('admin')}>
                Admin
              </Button>
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;