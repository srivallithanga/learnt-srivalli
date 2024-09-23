import React from 'react';
import { Box, IconButton } from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const SmileyRating = ({ rating, onChange }) => {
  const handleClick = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <IconButton onClick={() => handleClick(1)} color={rating >= 1 ? 'primary' : 'default'}>
        <SentimentVeryDissatisfiedIcon />
      </IconButton>
      <IconButton onClick={() => handleClick(2)} color={rating >= 2 ? 'primary' : 'default'}>
        <SentimentDissatisfiedIcon />
      </IconButton>
      <IconButton onClick={() => handleClick(3)} color={rating >= 3 ? 'primary' : 'default'}>
        <SentimentNeutralIcon />
      </IconButton>
      <IconButton onClick={() => handleClick(4)} color={rating >= 4 ? 'primary' : 'default'}>
        <SentimentVerySatisfiedIcon />
      </IconButton>
      <IconButton onClick={() => handleClick(5)} color={rating >= 5 ? 'primary' : 'default'}>
        <SentimentVerySatisfiedIcon />
      </IconButton>
    </Box>
  );
};

export default SmileyRating;
