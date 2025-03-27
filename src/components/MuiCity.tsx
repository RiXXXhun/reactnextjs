"use client"
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Snackbar, Alert, Box } from '@mui/material';

interface City {
  id: number;
  name: string;
  createdAt: string;
}

const CityManager: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [cityId, setCityId] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/cities');
      if (response.ok) {
        const data: City[] = await response.json();
        setCities(data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const validateInputs = () => {
    if (!cityName.trim()) {
      setErrorMessage('Kérjük, adja meg a város nevét!');
      setOpenSnackbar(true);
      return false;
    }
    if (isDuplicateCityName()) {
      setErrorMessage('Ez a város név már létezik!');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const isDuplicateCityName = () => {
    return cities.some(city => city.name.trim().toLowerCase() === cityName.trim().toLowerCase());
  };

  const handleSaveCity = async () => {
    if (!validateInputs()) return;

    const endpoint = cityId ? '/api/cities/update' : '/api/cities/create';
    const method = cityId ? 'PUT' : 'POST';
    const payload = cityId ? { id: cityId, name: cityName } : { name: cityName };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setCityId(null);
        setCityName('');
        fetchCities();
        setSuccessMessage(cityId ? 'Város sikeresen frissítve!' : 'Város sikeresen hozzáadva!');
        setOpenSnackbar(true);
      } else {
        setErrorMessage(data.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const handleDeleteCity = async (id: number) => {
    try {
      const response = await fetch('/api/cities/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setCities(cities.filter(city => city.id !== id));
        setSuccessMessage('Város sikeresen törölve!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const handleEditCity = (city: City) => {
    setCityId(city.id);
    setCityName(city.name);
  };

  const handleCancelEdit = () => {
    setCityId(null);
    setCityName('');
  };

  return (
    <Box sx={{ padding: 2 }} id='citySection'>
      <h2>{cityId ? 'Város Módosítása' : 'Város Hozzáadása'}</h2>
      <TextField
        label="Város neve"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <Button onClick={handleSaveCity} variant='contained' color='primary' sx={{ mr: 2, mt: 2 }}>{cityId ? 'Mentés' : 'Hozzáadás'}</Button>
      {cityId && <Button onClick={handleCancelEdit} variant='outlined' color='secondary' sx={{ marginTop: 2}}>Mégse</Button>}

      <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%' }}>
        <Table aria-label='City Data'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Város neve</TableCell>
              <TableCell align='center'>Létrehozva</TableCell>
              <TableCell align='center'>Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell align='center'>{city.id}</TableCell>
                <TableCell align='center'>{city.name}</TableCell>
                <TableCell align='center'>{new Date(city.createdAt).toLocaleString()}</TableCell>
                
                <TableCell align='center'>
                  <Button variant='outlined' color='secondary' onClick={() => handleDeleteCity(city.id)} sx={{ mr: 2 }}>Törlés</Button>
                  <Button variant='outlined' color='primary' onClick={() => handleEditCity(city)}>Módosítás</Button>
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

export default CityManager;
