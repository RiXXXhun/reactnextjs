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
  const [newStoreName, setNewStoreName] = useState<string>('');
  const [openingTime, setOpeningTime] = useState<string>('');
  const [closingTime, setClosingTime] = useState<string>('');
  const [description, setDescription] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const fetchStores = async () => {
    try {
      const response = await fetch('/api/plaza-stores');
      if (response.ok) {
        const data: PlazaStore[] = await response.json();
        setStores(data);
      } else {
        console.error('Failed to fetch stores');
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAddStore = async () => {
    if (newStoreName.trim() !== '' && openingTime && closingTime && description.trim() !== '') {
      if (description.length > 1000) {
        setErrorMessage('A leírás maximális hossza 1000 karakter lehet!');
        setOpenSnackbar(true);
        return;
      }

      if (closingTime <= openingTime) {
        setErrorMessage('A zárási idő nem lehet korábban, mint a nyitási idő!');
        setOpenSnackbar(true);
        return;
      }

      try {
        const response = await fetch('/api/plaza-stores/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newStoreName,
            openingTime,
            closingTime,
            description, 
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setNewStoreName('');
          setOpeningTime('');
          setClosingTime('');
          setDescription('');
          fetchStores();
          setErrorMessage('');
        } else {
          setErrorMessage(data.message);
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error adding store:', error);
      }
    } else {
      setErrorMessage('Kérjük, adja meg az összes adatot!');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteStore = async (id: number) => {
    try {
      const response = await fetch('/api/plaza-stores/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setStores(stores.filter(store => store.id !== id));
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 2, mt: "200px" }} id='plazaStoreSection'>
      <h2>Bolt Hozzáadás</h2>

      <TextField
        label="Bolt neve"
        value={newStoreName}
        onChange={(e) => setNewStoreName(e.target.value)}
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
        sx={{ mt: 2 }}
      />
      <TextField
        label="Zárási idő (24 órás formátum) Helyes formátum pl: 04:30, 18:30"
        value={closingTime}
        onChange={(e) => setClosingTime(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Bolt leírás (max 1000 karakter)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{ mt: 2 }}
        inputProps={{ maxLength: 1000 }} 
      />
      <Button onClick={handleAddStore} variant="contained" color="primary" style={{ marginTop: 10 }}>
        Hozzáadás
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px", width: "100%", mb: "100px" }}>
        <Table aria-label="Plaza Stores Data">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Bolt neve</TableCell>
              <TableCell align="center">Nyitási idő</TableCell>
              <TableCell align="center">Zárási idő</TableCell>
              <TableCell align="center">Leírás</TableCell> 
              <TableCell align="center">Létrehozva</TableCell>
              <TableCell align="center">Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell align="center">{store.id}</TableCell>
                <TableCell align="center">{store.name}</TableCell>
                <TableCell align="center">{store.openingTime}</TableCell>
                <TableCell align="center">{store.closingTime}</TableCell>
                <TableCell align="center">{store.description}</TableCell> 
                <TableCell align="center">{new Date(store.createdAt).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteStore(store.id)}
                  >
                    Törlés
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlazaStoreManager;
