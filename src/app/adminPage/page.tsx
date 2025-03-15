'use client'; 

import { useState } from "react";
import { Box, Container, Paper, Typography, TextField, Button, CircularProgress } from "@mui/material";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuibackbutton from "@/components/Materialuibackbutton";
import MuiStoresAdd from "@/components/MuiStoresAdd";
import MuiCouponAdd from "@/components/MuiCouponAdd";
import MuiUser from "@/components/MuiUser";
import MuiSupport from "@/components/MuiSupport";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true); 
        setError(null); 
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError("Hiba történt a bejelentkezés során!");
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {!isLoggedIn ? (
          <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Typography variant="h4" gutterBottom>Admin Login</Typography>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
            {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}
          </Paper>
        ) : (
          <Paper sx={{ padding: 3, width: '100%' }}>
            <Typography variant="h4" gutterBottom>Üdvözöllek, {username}!</Typography>

            <Box sx={{ marginBottom: "30px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('userDataSection')}
                sx={{ marginRight: "20px" }}
              >
                Felhasználói adatok
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('supportDataSection')}
                sx={{ marginRight: "20px" }}
              >
                Támogatás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('couponSection')}
                sx={{ marginRight: "20px" }}
              >
                Kupon hozzáadás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('storeSection')}
                sx={{ marginRight: "20px" }}
              >
                Boltok
              </Button>
            </Box>
            
            <MuiUser />
            <MuiSupport />
            <MuiCouponAdd/>
            <MuiStoresAdd />
            

          </Paper>
        )}
      </Box>

      <Materialuiscrollbutton />
      <Materialuibackbutton />
    </Container>
  );
};

export default AdminPage;
