'use client'

import { useState } from 'react';
import { Button, FormControl, FormLabel, TextField, Typography, Box, Stack, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Card as MuiCard } from '@mui/material';

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  backgroundColor: "#1c2331",
  position: "relative",
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "500px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "#161C27",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage('A jelszónak legalább 6 karakterből kell állnia, tartalmaznia kell egy nagybetűt és egy számot.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('A két jelszó nem egyezik!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user-id-here', 
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        window.location.href = '/login'; 
      } else {
        setErrorMessage(data.message || 'Hiba történt a jelszó frissítésekor');
      }
    } catch (error) {
      setErrorMessage('Hiba történt a kérés feldolgozása során');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInContainer direction="column" justifyContent="center">
      <Card variant="outlined">
        <LockOpenIcon sx={{ fontSize: 60, color: "white", alignSelf: "center" }} />
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            textAlign: "center",
            color: "white",
          }}
        >
          Új Jelszó Beállítása
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="newPassword" sx={{ color: "white" }}>Új jelszó</FormLabel>
            <TextField
              error={!!errorMessage}
              helperText={errorMessage}
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="confirmPassword" sx={{ color: "white" }}>Jelszó megerősítése</FormLabel>
            <TextField
              error={!!errorMessage}
              helperText={errorMessage}
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#3f72af',
              '&:hover': {
                backgroundColor: '#2c4e8c',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Töltés...' : 'Új Jelszó Beállítása'}
          </Button>

        </Box>
      </Card>
    </SignInContainer>
  );
};

export default NewPassword;