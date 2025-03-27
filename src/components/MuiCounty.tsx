"use client"
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Snackbar, Alert, Box } from '@mui/material';

interface County {
  id: number;
  name: string;
  createdAt: string;
}

const CountyManager: React.FC = () => {
  const [counties, setCounties] = useState<County[]>([]);
  const [countyId, setCountyId] = useState<number | null>(null);
  const [countyName, setCountyName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchCounties();
  }, []);

  const fetchCounties = async () => {
    try {
      const response = await fetch('/api/counties');
      if (response.ok) {
        const data: County[] = await response.json();
        setCounties(data);
      }
    } catch (error) {
      console.error('Error fetching counties:', error);
    }
  };

  const validateInputs = () => {
    if (!countyName.trim()) {
      setErrorMessage('Kérjük, adja meg a megyét!');
      setOpenSnackbar(true);
      return false;
    }
    if (isDuplicateCountyName()) {
      setErrorMessage('Ez a vármegye név már létezik!');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const isDuplicateCountyName = () => {
    return counties.some(county => county.name.trim().toLowerCase() === countyName.trim().toLowerCase());
  };

  const handleSaveCounty = async () => {
    if (!validateInputs()) return;

    const endpoint = countyId ? '/api/counties/update' : '/api/counties/create';
    const method = countyId ? 'PUT' : 'POST';
    const payload = countyId ? { id: countyId, name: countyName } : { name: countyName };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setCountyId(null);
        setCountyName('');
        fetchCounties();
        setSuccessMessage(countyId ? 'Vármegye sikeresen frissítve!' : 'Vármegye sikeresen hozzáadva!');
        setOpenSnackbar(true);
      } else {
        setErrorMessage(data.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error saving county:', error);
    }
  };

  const handleDeleteCounty = async (id: number) => {
    try {
      const response = await fetch('/api/counties/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setCounties(counties.filter(county => county.id !== id));
        setSuccessMessage('Vármegye sikeresen törölve!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting county:', error);
    }
  };

  const handleEditCounty = (county: County) => {
    setCountyId(county.id);
    setCountyName(county.name);
  };

  const handleCancelEdit = () => {
    setCountyId(null);
    setCountyName('');
  };

  return (
    <Box sx={{ padding: 2 }} id='countySection'>
      <h2>{countyId ? 'Vármegye Módosítása' : 'Vármegye Hozzáadása'}</h2>
      <TextField
        label="Vármegye neve"
        value={countyName}
        onChange={(e) => setCountyName(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <Button onClick={handleSaveCounty} variant='contained' color='primary' sx={{ mr: 2, mt: 2 }}>{countyId ? 'Mentés' : 'Hozzáadás'}</Button>
      {countyId && <Button onClick={handleCancelEdit} variant='outlined' color='secondary' sx={{ marginTop: 2}}>Mégse</Button>}

      <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%' }}>
        <Table aria-label='County Data'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Vármegye neve</TableCell>
              <TableCell align='center'>Létrehozva</TableCell>
              <TableCell align='center'>Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {counties.map((county) => (
              <TableRow key={county.id}>
                <TableCell align='center'>{county.id}</TableCell>
                <TableCell align='center'>{county.name}</TableCell>
                <TableCell align='center'>{new Date(county.createdAt).toLocaleString()}</TableCell>
                <TableCell align='center'>
                  <Button variant='outlined' color='secondary' onClick={() => handleDeleteCounty(county.id)} sx={{ mr: 2 }}>Törlés</Button>
                  <Button variant='outlined' color='primary' onClick={() => handleEditCounty(county)}>Módosítás</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={successMessage ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CountyManager;
