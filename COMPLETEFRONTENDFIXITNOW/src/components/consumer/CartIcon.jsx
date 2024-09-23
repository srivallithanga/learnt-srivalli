import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCartCount } from '../../redux/actions/cartActions'; // Import action to reset cart count

const CartIcon = ({ active }) => {
  const cartCount = useSelector((state) => state.cart.count); // Adjust based on your state structure
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (cartCount > 0) {
      dispatch(resetCartCount()); // Reset cart count when navigating to cart page
    }
    navigate('/cart'); // Navigate to Cart component
  };

  return (
    <IconButton
      color="inherit"
      onClick={handleClick}
      disabled={!active} // Disable if not active
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
        '&:hover': {
          backgroundColor: '#f5f5f5', // Light grey on hover
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Badge
        badgeContent={cartCount}
        color="secondary"
        invisible={cartCount === 0} // Hide badge if cart is empty
        sx={{
          '.MuiBadge-dot': {
            backgroundColor: '#2f4b6e', // Custom color for badge
          },
        }}
      >
        <ShoppingCartIcon sx={{ color: '#2f4b6e' }} /> {/* Icon color matching the theme */}
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
