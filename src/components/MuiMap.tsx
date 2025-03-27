"use client";
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Snackbar, Alert, Box } from '@mui/material';

interface LeafletMap {
  id: number;
  plazaMapName: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

const LeafletMapManager: React.FC = () => {
  const [maps, setMaps] = useState<LeafletMap[]>([]);
  const [mapId, setMapId] = useState<number | null>(null);
  const [plazaMapName, setPlazaMapName] = useState<string>('');
  const [latitude, setLatitude] = useState<number | string>('');
  const [longitude, setLongitude] = useState<number | string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    try {
      const response = await fetch('/api/maps');
      if (response.ok) {
        const data: LeafletMap[] = await response.json();
        setMaps(data);
      }
    } catch (error) {
      console.error('Error fetching maps:', error);
    }
  };

  const validateInputs = () => {
    if (!plazaMapName.trim()) {
      setErrorMessage('Kérjük, adja meg a pláza térkép nevét!');
      setOpenSnackbar(true);
      return false;
    }
    if (isDuplicateMapName()) {
      setErrorMessage('Ez a térkép név már létezik!');
      setOpenSnackbar(true);
      return false;
    }
    if (!latitude || !longitude || isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      setErrorMessage('Kérjük, adjon meg érvényes koordinátákat!');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const isDuplicateMapName = () => {
    return maps.some(map => map.plazaMapName.trim().toLowerCase() === plazaMapName.trim().toLowerCase());
  };

  const handleSaveMap = async () => {
    if (!validateInputs()) return;

    const endpoint = mapId ? '/api/maps/update' : '/api/maps/create';
    const method = mapId ? 'PUT' : 'POST';
    const payload = mapId
      ? { id: mapId, plazaMapName, latitude: Number(latitude), longitude: Number(longitude) }
      : { plazaMapName, latitude: Number(latitude), longitude: Number(longitude) };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMapId(null);
        setPlazaMapName('');
        setLatitude('');
        setLongitude('');
        fetchMaps();
        setSuccessMessage(mapId ? 'Térkép sikeresen frissítve!' : 'Térkép sikeresen hozzáadva!');
        setOpenSnackbar(true);
      } else {
        setErrorMessage(data.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error saving map:', error);
    }
  };

  const handleDeleteMap = async (id: number) => {
    try {
      const response = await fetch('/api/maps/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setMaps(maps.filter(map => map.id !== id));
        setSuccessMessage('Térkép sikeresen törölve!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting map:', error);
    }
  };

  const handleEditMap = (map: LeafletMap) => {
    setMapId(map.id);
    setPlazaMapName(map.plazaMapName);
    setLatitude(map.latitude);
    setLongitude(map.longitude);
  };

  const handleCancelEdit = () => {
    setMapId(null);
    setPlazaMapName('');
    setLatitude('');
    setLongitude('');
  };

  return (
    <Box sx={{ padding: 2, mt: 10 }} id='mapSection'>
      <h2>{mapId ? 'Pláza Térkép Módosítása' : 'Pláza Térkép Hozzáadása'}</h2>
      <TextField
        label="Pláza térkép neve"
        value={plazaMapName}
        onChange={(e) => setPlazaMapName(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <TextField
        label="Szélesség"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        type="number"
        sx={{ mt: 2 }}
      />
      <TextField
        label="Hosszúság"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        type="number"
        sx={{ mt: 2 }}
      />
      <Button onClick={handleSaveMap} variant='contained' color='primary' sx={{ mr: 2, mt: 2 }}>
        {mapId ? 'Mentés' : 'Hozzáadás'}
      </Button>
      {mapId && (
        <Button onClick={handleCancelEdit} variant='outlined' color='secondary' sx={{ marginTop: 2 }}>
          Mégse
        </Button>
      )}

      <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%' }}>
        <Table aria-label='Map Data'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Pláza Térkép neve</TableCell>
              <TableCell align='center'>Szélesség</TableCell>
              <TableCell align='center'>Hosszúság</TableCell>
              <TableCell align='center'>Létrehozva</TableCell>
              <TableCell align='center'>Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maps.map((map) => (
              <TableRow key={map.id}>
                <TableCell align='center'>{map.id}</TableCell>
                <TableCell align='center'>{map.plazaMapName}</TableCell>
                <TableCell align='center'>{map.latitude}</TableCell>
                <TableCell align='center'>{map.longitude}</TableCell>
                <TableCell align='center'>{new Date(map.createdAt).toLocaleString()}</TableCell>
                <TableCell align='center'>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => handleDeleteMap(map.id)}
                    sx={{ mr: 2 }}
                  >
                    Törlés
                  </Button>
                  <Button variant='outlined' color='primary' onClick={() => handleEditMap(map)}>
                    Módosítás
                  </Button>
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

export default LeafletMapManager;
