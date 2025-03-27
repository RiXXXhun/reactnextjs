"use client"
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Snackbar, Alert, Box } from '@mui/material';

interface PlazaStore {
  id: number;
  name: string;
  openingTime: string;
  closingTime: string;
  description: string;
  createdAt: string;
}

const PlazaStoreManager: React.FC = () => {
  const [stores, setStores] = useState<PlazaStore[]>([]);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [storeName, setStoreName] = useState<string>('');
  const [openingTime, setOpeningTime] = useState<string>('');
  const [closingTime, setClosingTime] = useState<string>('');
  const [description, setDescription] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch('/api/plaza-stores');
      if (response.ok) {
        const data: PlazaStore[] = await response.json();
        setStores(data);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const validateInputs = () => {
    if (!storeName.trim() || !openingTime || !closingTime || !description.trim()) {
      setErrorMessage('Kérjük, adja meg az összes adatot!');
      setOpenSnackbar(true);
      return false;
    }
    if (description.length > 1000) {
      setErrorMessage('A leírás maximális hossza 1000 karakter lehet!');
      setOpenSnackbar(true);
      return false;
    }
    if (closingTime <= openingTime) {
      setErrorMessage('A zárási idő nem lehet korábban, mint a nyitási idő!');
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleSaveStore = async () => {
    if (!validateInputs()) return;
  
    const endpoint = storeId ? '/api/plaza-stores/update' : '/api/plaza-stores/create';
    const method = storeId ? 'PUT' : 'POST';
    const payload = storeId
      ? { id: storeId, name: storeName, openingTime, closingTime, description }
      : { name: storeName, openingTime, closingTime, description };
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        setStoreId(null);
        setStoreName('');
        setOpeningTime('');
        setClosingTime('');
        setDescription('');
        fetchStores();
        setSuccessMessage(storeId ? 'Bolt sikeresen frissítve!' : 'Bolt sikeresen hozzáadva!');
        setOpenSnackbar(true);
      } else {
        setErrorMessage(data.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error saving store:', error);
    }
  };
  

  const handleEditStore = (store: PlazaStore) => {
    setStoreId(store.id);
    setStoreName(store.name);
    setOpeningTime(store.openingTime);
    setClosingTime(store.closingTime);
    setDescription(store.description);
  };

  const handleCancelEdit = () => {
    setStoreId(null);
    setStoreName('');
    setOpeningTime('');
    setClosingTime('');
    setDescription('');
  };

  const handleDeleteStore = async (id: number) => {
    try {
      const response = await fetch('/api/plaza-stores/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setStores(stores.filter(store => store.id !== id));
        setSuccessMessage('Bolt sikeresen törölve!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, mt: '200px' }} id='plazaStoreSection'>
      <h2>{storeId ? 'Pláza Bolt Módosítása' : 'Pláza Bolt Hozzáadás'}</h2>
      <TextField
        label="Bolt neve"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <TextField
        label="Nyitási idő (24 órás formátum) Helyes formátum pl: 04:30, 18:30"
        value={openingTime}
        onChange={(e) => setOpeningTime(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        InputLabelProps={{ shrink: true }}
        type="time"
        sx={{ mt: 2 }}
      />
      <TextField
        label="Zárási idő (24 órás formátum) Helyes formátum pl: 04:30, 18:30"
        value={closingTime}
        onChange={(e) => setClosingTime(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        InputLabelProps={{ shrink: true }}
        type="time"
        sx={{ mt: 2 }}
      />
      <TextField
        label="Bolt leírás (max 1000 karakter)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{ mt: 2, mb: 2 }}
        inputProps={{ maxLength: 1000 }} 
      />
      <Button onClick={handleSaveStore} variant='contained' color='primary' sx={{ mr: 2 }}>{storeId ? 'Mentés' : 'Hozzáadás'}</Button>
      {storeId && <Button onClick={handleCancelEdit} variant='outlined' color='secondary'>Mégse</Button>}

      <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%', mb: '100px' }}>
        <Table aria-label='Plaza Stores Data'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Bolt neve</TableCell>
              <TableCell align='center'>Nyitási idő</TableCell>
              <TableCell align='center'>Zárási idő</TableCell>
              <TableCell align='center'>Leírás</TableCell>
              <TableCell align='center'>Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell align='center'>{store.id}</TableCell>
                <TableCell align='center'>{store.name}</TableCell>
                <TableCell align='center'>{store.openingTime}</TableCell>
                <TableCell align='center'>{store.closingTime}</TableCell>
                <TableCell align='center'>{store.description}</TableCell>
                <TableCell align='center'>
                  <Button variant='outlined' color='secondary' onClick={() => handleDeleteStore(store.id)} sx={{ mr: 2 }}>Törlés</Button> 
                  <Button variant='outlined' color='primary' onClick={() => handleEditStore(store)}>Módosítás</Button>
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

export default PlazaStoreManager;
