import React from 'react';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const BackToEarthButton = () => {
  const handleClick = () => {
    window.location.href = '/homepage'; 
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: '20px',
        left: '20px', 
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        textDecoration: 'none',
        zIndex: 1000,
        backgroundColor: '#161C27', 
        '&:hover': {
          backgroundColor: '#12171F', 
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
        },
        display: 'flex',
        alignItems: 'center',
        gap: '8px', 
      }}
    >
      Vissza a Főoldalra
      <ExitToAppIcon sx={{ fontSize: '20px' }} />
    </Button>
  );
};

export default BackToEarthButton;
