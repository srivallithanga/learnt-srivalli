import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';

const RestaurantForm = ({ initialValues, onSubmit, editMode }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Please enter the restaurant name'),
    email: Yup.string().email('Please provide a valid email address').required('Email is mandatory'),
    status: Yup.boolean().required('Please select the status'),
  });

  const handleFormSubmit = async (formData) => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:1337/api/restaurants/${initialValues.id}`, { data: formData });
      } else {
        await axios.post('http://localhost:1337/api/restaurants', { data: formData });
      }
      onSubmit();  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Box mb={3}>
            <Field
              name="name"
              as={TextField}
              label="Restaurant Name"
              fullWidth
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box mb={3}>
            <Field
              name="email"
              as={TextField}
              label="Email Address"
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box mb={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={values.status}
                  onChange={(e) => setFieldValue('status', e.target.checked)}
                />
              }
              label="Active Status"
            />
          </Box>
          <Button type="submit" variant="contained" color="success">
            {editMode ? 'Update' : 'Create'} Restaurant
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RestaurantForm;
