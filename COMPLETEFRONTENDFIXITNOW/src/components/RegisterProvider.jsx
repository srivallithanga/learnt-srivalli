import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Link,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterProvider = () => {
  const [categories, setCategories] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoriesAndServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        const categoryData = response.data.map(cat => ({
          id: cat._id,
          name: cat.name,
          services: cat.services.map(service => ({
            id: service._id,
            name: service.name,
          })),
        }));
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories and services:', error);
      }
    };

    fetchCategoriesAndServices();
  }, []);

  const handleCategoryChange = (setFieldValue, selectedCategoryNames) => {
    const selectedServices = categories
      .filter(category => selectedCategoryNames.includes(category.name))
      .flatMap(category => category.services);

    setAvailableServices(selectedServices);
    setFieldValue('categories', selectedCategoryNames);
    setFieldValue('services', [{ service: '', price: '' }]);
    setSelectedCategoryNames(selectedCategoryNames);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    mobile: Yup.string().required('Mobile number is required'),
    categories: Yup.array().min(1, 'Select at least one category').required('Category is required'),
    services: Yup.array().of(
      Yup.object({
        service: Yup.string().required('Service is required'),
        price: Yup.number().min(1, 'Price must be greater than 0').required('Price is required'),
      })
    ).min(1, 'At least one service is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values));
    navigate('/login');
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        mobile: '',
        services: [{ service: '', price: '' }],
        categories: [],
        role: 'provider',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue, isSubmitting }) => (
        <Card
          sx={{
            maxWidth: 400,
            margin: 'auto',
            padding: 4,
            boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3} marginTop="-15px">
              <Typography
                variant="h5"
                sx={{ textAlign: 'center', marginTop: 0, fontWeight: 'bold', color: '#2f4b6e' }}
              >
                Register as Provider
              </Typography>
            </Box>
            <Form>
              <TextField
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
                variant="outlined"
                size="small"
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
                variant="outlined"
                size="small"
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              <TextField
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
                variant="outlined"
                size="small"
              />
              <ErrorMessage name="mobile" component="div" style={{ color: 'red' }} />
              <FormControl fullWidth sx={{ marginBottom: 2 }} size="small">
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={selectedCategoryNames}
                  onChange={(event) => handleCategoryChange(setFieldValue, event.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                  variant="outlined"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      <Checkbox checked={selectedCategoryNames.indexOf(category.name) > -1} />
                      <ListItemText primary={category.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage name="categories" component="div" style={{ color: 'red' }} />

              <FieldArray name="services">
                {({ push, remove }) => (
                  <>
                    {values.services.map((serviceData, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" sx={{ marginBottom: 1 }}>
                        <Grid item xs={8}>
                          <FormControl fullWidth margin="normal" size="small">
                            <InputLabel>Service</InputLabel>
                            <Select
                              name={`services[${index}].service`}
                              value={serviceData.service}
                              onChange={handleChange}
                              fullWidth
                              variant="outlined"
                            >
                              {availableServices.map((service) => (
                                <MenuItem key={service.id} value={service.id}>
                                  {service.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <ErrorMessage name={`services[${index}].service`} component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Price"
                            name={`services[${index}].price`}
                            value={serviceData.price}
                            onChange={handleChange}
                            required
                            margin="normal"
                            type="number"
                            size="small"
                            variant="outlined"
                          />
                          <ErrorMessage name={`services[${index}].price`} component="div" style={{ color: 'red' }} />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton onClick={() => push({ service: '', price: '' })}>
                            <AddIcon />
                          </IconButton>
                          {index > 0 && (
                            <IconButton onClick={() => remove(index)}>
                              <RemoveIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
              </FieldArray>

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#2f4b6e', color: 'white', marginTop: 2 }}
                fullWidth
                disabled={isSubmitting}
              >
                Register
              </Button>
              <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Been here before?{' '}
                  <Link href="/login" sx={{ color: '#2f4b6e', fontWeight: 'bold' }}>
                    Login
                  </Link>
                </Typography>
              </Box>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};

export default RegisterProvider;