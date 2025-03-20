'use client';

import { useEffect, useState } from "react";
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UserDataTable = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError("Hiba történt a felhasználói adatok betöltésekor!");
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box id="userDataSection" sx={{ marginTop: "100px" }}>
      <Typography variant="h5" gutterBottom>Felhasználói adatok:</Typography>
      {error && <Typography color="error">{error}</Typography>}
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
  );
};

export default UserDataTable;
