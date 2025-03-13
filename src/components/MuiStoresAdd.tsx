import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Snackbar, Alert, Box } from '@mui/material';

interface Store {
  id: number;
  name: string;
  createdAt: string;
}

const StoreManager: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]); 
  const [newStore, setNewStore] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');  
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); 


  const fetchStores = async () => {
    try {
      const response = await fetch('/api/stores');
      if (response.ok) {
        const data: Store[] = await response.json();
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
    if (newStore.trim() !== '') {
      try {
        const response = await fetch('/api/stores/create', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newStore }),  
        });
        const data = await response.json();
        if (response.ok) {
          setNewStore('');  
          fetchStores();  
          setErrorMessage(''); 
        } else {
          setErrorMessage(data.message); 
          setOpenSnackbar(true); 
        }
      } catch (error) {
        console.error('Error adding store:', error);
      }
    }
  };


  const handleDeleteStore = async (id: number) => {
    try {
      const response = await fetch('/api/stores/delete', { 
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
    <Box sx={{ padding: 2, mt: "200px" }}>
      <h2>Bolt Hozzáadás</h2>


      <TextField 
        label="Új bolt hozzáadása"
        id='storeSection'
        value={newStore}
        onChange={(e) => setNewStore(e.target.value)}
        fullWidth
        error={!!errorMessage}  
        helperText={errorMessage} 
      />
      <Button onClick={handleAddStore} variant="contained" color="primary" style={{ marginTop: 10 }}>
        Hozzáadás
      </Button>


      <TableContainer component={Paper} sx={{ marginTop: "20px", width: "100%", mb: "100px" }}>
        <Table aria-label="Stores Data">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Bolt neve</TableCell>
              <TableCell align="center">Létrehozva</TableCell>
              <TableCell align="center">Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell align="center">{store.id}</TableCell>
                <TableCell align="center">{store.name}</TableCell>
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

export default StoreManager;
