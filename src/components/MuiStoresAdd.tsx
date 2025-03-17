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
  const [editStore, setEditStore] = useState<string>(''); 
  const [editStoreId, setEditStoreId] = useState<number | null>(null); 
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

  const handleEditStore = (id: number, name: string) => {
    setEditStoreId(id);
    setEditStore(name); 
  };

  const handleSaveEdit = async () => {
    if (editStore.trim() !== '') {
      const isDuplicate = stores.some(store => store.name.toLowerCase() === editStore.trim().toLowerCase() && store.id !== editStoreId);
      if (isDuplicate) {
        setErrorMessage('Ez a bolt név már létezik.');
        setOpenSnackbar(true);
        return;
      }

      try {
        const response = await fetch('/api/stores/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editStoreId, name: editStore }),
        });
        const data = await response.json();
        if (response.ok) {
          fetchStores();
          setEditStore('');
          setEditStoreId(null);
          setErrorMessage('');
        } else {
          setErrorMessage(data.message);
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error updating store:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditStore('');
    setEditStoreId(null);
    setErrorMessage('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 2, mt: "200px" }} id="storeSection">
      <h2>{editStoreId !== null ? 'Bolt Módosítása' : 'Bolt Hozzáadás'}</h2>

      <TextField
        label={editStoreId !== null ? 'Bolt neve (módosítás)' : 'Új bolt hozzáadása'}
        value={editStoreId !== null ? editStore : newStore}
        onChange={(e) => (editStoreId !== null ? setEditStore(e.target.value) : setNewStore(e.target.value))}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />

      {editStoreId !== null ? (
        <Box sx={{ marginTop: '20px' }}>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Mentés
          </Button>
          <Button
            onClick={handleCancelEdit}
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Mégse
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handleAddStore}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Hozzáadás
        </Button>
      )}

      <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%', mb: '100px' }}>
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
                    sx={{ mr: 2 }}
                  >
                    Törlés
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditStore(store.id, store.name)}
                  >
                    Módosítás
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
