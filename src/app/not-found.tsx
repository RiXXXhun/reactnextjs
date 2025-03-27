'use client';

import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import ErrorIcon from '@mui/icons-material/Error'; 

const Custom404: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    window.location.href = '/homepage'; 
  };

  return (

    <><title>PLÁZAÁSZ 404</title><Box
          sx={{
              backgroundColor: '#1c2331',
              color: 'white',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: 2,
          }}
      >

          <ErrorIcon sx={{ fontSize: 100, marginBottom: 2 }} />

          <Typography variant="h3" gutterBottom>
              404 - Az oldal nem található
          </Typography>
          <Button
              variant="contained"
              color="primary"
              onClick={handleBackToHome}
              sx={{ marginTop: 2 }}
          >
              Vissza a főoldalra
          </Button>
      </Box></>
  );
};

export default Custom404;
