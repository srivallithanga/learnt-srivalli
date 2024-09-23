import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { TextField, Button, Card, CardContent, Typography, Box, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterConsumer = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    mobile: '',
    role: 'consumer',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(15, 'Username must not exceed 15 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values);
      navigate('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        margin: 'auto', 
        padding: 4, 
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)', 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3} marginTop="-15px">
          <Typography variant="h5" sx={{ textAlign: 'center', marginTop: 0, fontWeight: 'bold', color: '#2f4b6e' }}>
            Register as Consumer
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <TextField
                label="Username"
                name="username"
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                InputProps={{
                  sx: { color: '#2f4b6e' }, // Preserve your original field text color
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  sx: { color: '#2f4b6e' }, // Preserve your original field text color
                }}
              />
              <TextField
                label="Mobile"
                name="mobile"
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                InputProps={{
                  sx: { color: '#2f4b6e' }, // Preserve your original field text color
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ backgroundColor: '#2f4b6e', color: 'white', marginTop: 2, '&:hover': { backgroundColor: '#1f3b5e' }}}
                fullWidth 
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Been here before?{' '}
            <Link href="/login" sx={{ color: '#2f4b6e', fontWeight: 'bold' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterConsumer;
