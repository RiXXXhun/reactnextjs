'use client'; 

import { useState, useEffect } from "react";
import { Box, Container, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuibackbutton from "@/components/Materialuibackbutton";
import MuiStoresAdd from "@/components/MuiStoresAdd";
import MuiCouponAdd from "@/components/MuiCouponAdd";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportData, setSupportData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]); 
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
        setSupportData(data.supportData);
        fetchUserData();
      } else {
        setError(data.message); 
      }
    } catch (error) {
      setError("Hiba történt a bejelentkezés során!");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUserData(data); 
    } catch (error) {
      setError("Hiba történt a felhasználói adatok betöltésekor!");
    }
  };

  const handleDeleteSupport = async (id: number) => {
    try {
      const response = await fetch("/api/adminlogin/support/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        setSupportData(supportData.filter((item) => item.id !== id)); 
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Hiba történt a törlés során!");
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

            <Box id="userDataSection" sx={{ marginTop: "200px" }}>
              <Typography variant="h5" gutterBottom>User Data:</Typography>
              <TableContainer component={Paper} sx={{ marginTop: "20px", width: "100%" }}>
                <Table aria-label="User Data">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Username</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell align="center">{user.id}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{new Date(user.createdAt).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box id="supportDataSection" sx={{ marginTop: "200px" }}>
              <Typography variant="h5" gutterBottom>Support Data:</Typography>
              <TableContainer component={Paper} sx={{ marginTop: "20px", width: "100%" }}>
                <Table aria-label="Support Data">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Full Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Phone</TableCell>
                      <TableCell align="center">Message</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {supportData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">{item.fullName}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{item.phone}</TableCell>
                        <TableCell align="center">{item.message}</TableCell>
                        <TableCell align="center">{new Date(item.createdAt).toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteSupport(item.id)}
                          >
                            Törlés
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

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
