import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { setUser } from '../redux/reducers/userSlice';
import { TextField, Button, Typography, Paper, Grid, Box, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import bgImage from './background.avif';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await login(values); 
      const userDetails = res.data.userDetails;
      const token = res.data.token;

      dispatch(setUser({ user: userDetails, token }));

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDetails));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userDetails));
      }

      if (userDetails.role === 'consumer') {
        navigate('/');
      } else if (userDetails.role === 'provider') {
        navigate('/providers-bookings');
      }

      setLoginError(false);
    } catch (err) {
      console.error('Invalid credentials');
      setLoginError(true);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    }}>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Paper
          elevation={8}
          style={{
            padding: '32px',
            borderRadius: '16px',
            maxWidth: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            <span className={`teddy ${isPassword ? (loginError ? 'emoji-shocked' : 'eyes-closed') : 'eyes-open'}`}>
              {loginError ? '🙅' : (isPassword ? '🫣' : '😀')}
            </span>
            Log in
          </Typography>
          {loginError && (
            <Typography variant="body2" color="error" align="center">
              Wrong username or password
            </Typography>
          )}
          
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    value={values.username}
                    onChange={(e) => {
                      handleChange(e);
                      setIsPassword(false);
                      setLoginError(false);
                    }}
                    onBlur={handleBlur}
                    required
                    InputProps={{
                      startAdornment: (
                        <AccountCircleIcon style={{ marginRight: '8px' }} />
                      ),
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                      setIsPassword(true);
                    }}
                    onBlur={handleBlur}
                    required
                    InputProps={{
                      startAdornment: (
                        <LockIcon style={{ marginRight: '8px' }} />
                      ),
                    }}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#2f4b6e' }}
                  fullWidth
                  disabled={loading || isSubmitting}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
              </form>
            )}
          </Formik>
          <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
            First time here? <Link to="/register" style={{ color: '#2f4b6e' }}>Register</Link>
          </Typography>
        </Paper>
      </Grid>

      <style jsx>{`
        .teddy {
          font-size: 50px;
          transition: transform 0.5s;
        }
        .eyes-open {
          opacity: 1;
        }
        .eyes-closed {
          opacity: 1;
        }
        .emoji-shocked {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Login;
