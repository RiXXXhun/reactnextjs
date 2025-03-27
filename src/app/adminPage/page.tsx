'use client'; 

import { useState } from "react";
import { Box, Container, Paper, Typography, TextField, Button, CircularProgress } from "@mui/material";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuibackbutton from "@/components/Materialuibackbutton";
import MuiStoresAdd from "@/components/MuiStoresAdd";
import MuiCouponAdd from "@/components/MuiCouponAdd";
import MuiUser from "@/components/MuiUser";
import MuiSupport from "@/components/MuiSupport";
import MuiPlazaStore from "@/components/MuiPlazaStore";
import MuiCounty from "@/components/MuiCounty";
import MuiMap from "@/components/MuiMap";
import MaterialuiAdminPageLine from "@/components/MaterialuiAdminPageLine";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DiscountIcon from '@mui/icons-material/Discount';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MuiPlaza from "@/components/MuiPlaza";
import MuiCity from "@/components/MuiCity";


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

    <><title>PLÁZAÁSZ AdminPage</title><Container maxWidth="lg">

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
              variant="outlined" />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined" />
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


            <Typography variant="h4" gutterBottom sx={{ mb: "10px" }}>Üdvözöllek, {username}! <AdminPanelSettingsIcon sx={{ height: "50px", width: "50px" }} /></Typography>

            <MaterialuiAdminPageLine />

            <Typography variant="h5" gutterBottom sx={{ mb: "10px" }}> Felhasználókkal kapcsolatos felület <SupervisedUserCircleIcon sx={{ height: "30px", width: "30px" }} /></Typography>

            <Box sx={{ marginBottom: "20px" }}>
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
            </Box>

            <MaterialuiAdminPageLine />

            <Typography variant="h5" gutterBottom sx={{ mb: "10px" }}> Kuponokkal kapcsolatos felület <DiscountIcon sx={{ height: "30px", width: "30px" }} /></Typography>

            <Box sx={{ marginBottom: "20px" }}>
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
                Kupon Boltok
              </Button>
            </Box>

            <MaterialuiAdminPageLine />

            <Typography variant="h5" gutterBottom sx={{ mb: "10px" }}> Plázákkal/Bevásárlóközpontokkal kapcsolatos felület <StorefrontIcon sx={{ height: "30px", width: "30px" }} /></Typography>

            <Box sx={{ marginBottom: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('plazaStoreSection')}
                sx={{ marginRight: "20px" }}
              >
                Pláza Bolt hozzáadás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('countySection')}
                sx={{ marginRight: "20px" }}
              >
                Vármegye hozzáadás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('mapSection')}
                sx={{ marginRight: "20px" }}
              >
                Pláza térkép hozzáadás
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('plazaSection')}
                sx={{ marginRight: "20px" }}
              >
                Pláza Hozzáadás
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('citySection')}
                sx={{ marginRight: "20px" }}
              >
                Város hozzáadás
              </Button>
            </Box>






            <MaterialuiAdminPageLine />

            <Typography variant="h4" gutterBottom sx={{ mt: "50px", mb: "10px", textAlign: "center" }}> Plázákkal/Bevásárlóközpontokkal kapcsolatos felület <StorefrontIcon sx={{ height: "30px", width: "30px" }} /></Typography>

            <MuiUser />
            <MuiSupport />

            <MaterialuiAdminPageLine />

            <Typography variant="h4" gutterBottom sx={{ mt: "50px", mb: "10px", textAlign: "center" }}> Kuponokkal kapcsolatos felület <DiscountIcon sx={{ height: "30px", width: "30px" }} /></Typography>

            <MuiCouponAdd />
            <MuiStoresAdd />

            <MaterialuiAdminPageLine />

            <Typography variant="h4" gutterBottom sx={{ mt: "50px", mb: "10px", textAlign: "center" }}> Plázákkal/Bevásárlóközpontokkal kapcsolatos felület <StorefrontIcon sx={{ height: "30px", width: "30px" }} /></Typography>

            <MuiPlazaStore />
            <MuiCounty />
            <MuiMap />
            <MuiPlaza />
            <MuiCity />


          </Paper>
        )}
      </Box>

      <Materialuiscrollbutton />
      <Materialuibackbutton />
    </Container></>
  );
};

export default AdminPage;
