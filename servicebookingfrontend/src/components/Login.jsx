import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setUser } from '../redux/reducers/userSlice';
import { TextField, Button } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData); // API call to login
      const userDetails = res.data.userDetails;
      const token = res.data.token;

      // Dispatch user and token to the Redux store
      dispatch(setUser({ user: userDetails, token }));

      // Store token and user in localStorage manually (if not stored by Redux)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDetails));

      // Navigate based on user role
      if (userDetails.role === 'consumer') {
        navigate('/consumer-dashboard');
      } else if (userDetails.role === 'provider') {
        navigate('/provider-bookings');
      }
    } catch (err) {
      console.error('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <Button type="submit" variant="contained">Login</Button>
    </form>
  );
};

export default Login;
