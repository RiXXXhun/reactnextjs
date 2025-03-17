'use client';
import { useState, useEffect } from "react";
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress } from "@mui/material";

const SupportAdmin = () => {
  const [supportData, setSupportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/support");
      if (!response.ok) throw new Error("Nem sikerült betölteni az adatokat");
      
      const data = await response.json();
      

      const sortedData = data.sort((a: any, b: any) => a.id - b.id);
      setSupportData(sortedData);
    } catch (error) {
      setError("Hiba történt az adatok betöltése során!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupport = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await fetch("/api/support/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), 
      });

      const data = await response.json();

      if (data.success) {
        setSupportData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Hiba történt a törlés során!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box id="supportDataSection" sx={{ marginTop: "50px", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>Támogatási adatok</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: "20px", width: "100%" }}>
          <Table aria-label="Support Data">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Teljes név</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Telefon</TableCell>
                <TableCell align="center">Üzenet</TableCell>
                <TableCell align="center">Létrehozva</TableCell>
                <TableCell align="center">Műveletek</TableCell>
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
      )}
    </Box>
  );
};

export default SupportAdmin;
