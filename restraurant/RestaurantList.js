import React, { useState as useLocalState, useEffect as useLocalEffect } from 'react';
import { Button as ActionButton, List as ItemList, ListItem as Item, ListItemText as ItemText, Box as Container, Typography as Text } from '@mui/material';
import axios from 'axios';
import RestaurantForm from './RestaurantForm';

const RestaurantList = () => {
  const [restaurant, setRestaurant] = useLocalState([]);
  const [currentRestaurant, setCurrentRestaurant] = useLocalState(null);
  const [editMode, setEditMode] = useLocalState(false);

  useLocalEffect(() => {
    retrieveRestaurants();
  }, []);

  const retrieveRestaurants = async () => {
    try {
      const result = await axios.get('http://localhost:1337/api/restaurants');
      setRestaurant(result.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeRestaurant = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:1337/api/restaurants/${restaurantId}`);
      retrieveRestaurants();
      clearSelection();
    } catch (err) {
      console.error(err);
    }
  };

  const showDetails = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setEditMode(false);
  };

  const initiateEdit = () => {
    setEditMode(true);
  };

  const handleFormSubmit = () => {
    setEditMode(false);
    clearSelection();
    retrieveRestaurants();
  };

  const clearSelection = () => {
    setCurrentRestaurant(null);
  };

  return (
    <Container>
      <Container mb={4}>
        <RestaurantForm
          initialValues={{ name: '', email: '', status: false }}
          onSubmit={handleFormSubmit}
          editMode={false}
        />
      </Container>

      <ItemList>
        {restaurant.map((restaurant) => (
          <Item key={restaurant.id}>
            <ItemText primary={restaurant.attributes.name} />
            <ActionButton
              variant="outlined"
              color="primary"
              onClick={() => showDetails(restaurant)}
            >
              View Details
            </ActionButton>
            <ActionButton
              variant="outlined"
              color="secondary"
              onClick={() => removeRestaurant(restaurant.id)}
            >
              Delete
            </ActionButton>
          </Item>
        ))}
      </ItemList>

      {currentRestaurant && (
        <Container mt={4} p={2} border={1} borderColor="grey.300">
          {!editMode ? (
            <>
              <Text variant="h6">Restaurant Details</Text>
              <Text><strong>Name:</strong> {currentRestaurant.attributes.name}</Text>
              <Text><strong>Email:</strong> {currentRestaurant.attributes.email}</Text>
              <Text><strong>Status:</strong> {currentRestaurant.attributes.status ? 'Active' : 'Inactive'}</Text>
              <ActionButton variant="contained" color="primary" onClick={initiateEdit}>
                Edit
              </ActionButton>
            </>
          ) : (
            <RestaurantForm
              initialValues={{
                id: currentRestaurant.id,
                name: currentRestaurant.attributes.name,
                email: currentRestaurant.attributes.email,
                status: currentRestaurant.attributes.status,
              }}
              onSubmit={handleFormSubmit}
              editMode={true}
            />
          )}
        </Container>
      )}
    </Container>
  );
};

export default RestaurantList;
