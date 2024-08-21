import React from 'react';
import { Box as Container, Typography as Text, Divider as Line } from '@mui/material';
import RestaurantList from './RestaurantList';

const AdminScreen = () => {
  return (
    <Container p={3}>
      <Text variant="h3" component="h1" mb={2} color="primary">
        Restaurants App
      </Text>
      <Line sx={{ mb: 3 }} />
      <Container display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        <Container flexGrow={2}>
          <RestaurantList />
        </Container>
      </Container>
    </Container>
  );
};

export default AdminScreen;
