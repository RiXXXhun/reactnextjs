import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, Checkbox, FormControlLabel, Table, TableHead, TableCell, TableRow, TableBody, CircularProgress, TableContainer, Paper, Snackbar, Alert } from '@mui/material';
import { getCities, getCounties, getLeafletMaps, getPlazaStores } from '../services/api';
import WarningIcon from '@mui/icons-material/Warning';

type City = {
  id: string;
  name: string;
};

type County = {
  id: string;
  name: string;
};

const MuiPlaza: React.FC = () => {
  const [plaza, setPlaza] = useState({
    plazaName: '',
    location: '',
    cityId: '',
    openingTime: '',
    closingTime: '',
    email: '',
    phone: '',
    image: '',
    description: '',
    leafletMapId: '',
    countyId: '',
    plazaStores: [] as string[],
  });

  const [cities, setCities] = useState<City[]>([]);
  const [counties, setCounties] = useState<County[]>([]);
  const [leafletMaps, setLeafletMaps] = useState<{ id: string; plazaMapName: string }[]>([]);
  const [plazaStores, setPlazaStores] = useState<{ id: string; name: string }[]>([]);
  const [plazas, setPlazas] = useState<{ id: string; plazaName: string; location: string; openingTime: string; closingTime: string; cityId: string; countyId: string; email: string; phone: string; image: string; description: string; leafletMapId: string }[]>([]);
  const [loading, setLoading] = useState(true); 
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editPlazaId, setEditPlazaId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [citiesData, countiesData, leafletMapsData, plazaStoresData] = await Promise.all([
          getCities(),
          getCounties(),
          getLeafletMaps(),
          getPlazaStores(),
        ]);
        setCities(citiesData);
        setCounties(countiesData);
        setLeafletMaps(leafletMapsData);
        setPlazaStores(plazaStoresData);
        await fetchPlazas();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPlazas = async () => {
    try {
      const response = await fetch('/api/plazas');
      const data = await response.json();
      setPlazas(data); 
    } catch (error) {
      console.error('Error fetching plazas:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setPlaza(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setPlaza(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPlaza(prev => ({
      ...prev,
      plazaStores: checked
        ? [...prev.plazaStores, value]
        : prev.plazaStores.filter(store => store !== value),
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name } = e.target as HTMLInputElement;
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!plaza.plazaName) newErrors.plazaName = 'A pláza neve kötelező';
    if (!plaza.location) newErrors.location = 'A helyszín kötelező';
    if (!plaza.cityId) newErrors.cityId = 'A város kiválasztása kötelező';
    if (!plaza.countyId) newErrors.countyId = 'A megye kiválasztása kötelező';
    if (!plaza.leafletMapId) newErrors.leafletMapId = 'A térkép kiválasztása kötelező';
    if (!plaza.openingTime) newErrors.openingTime = 'A nyitási idő kötelező';
    if (!plaza.closingTime) newErrors.closingTime = 'A zárási idő kötelező';
    if (!plaza.email) newErrors.email = 'Az email cím kötelező';
    if (!plaza.phone) newErrors.phone = 'A telefonszám kötelező';
    if (!plaza.image) newErrors.image = 'A kép URL kötelező';
    if (!plaza.description) newErrors.description = 'A leírás kötelező';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('Minden mezőt ki kell tölteni!');
      setOpenSnackbar(true);
      return;
    }
  
    if (plazas.some(existingPlaza => existingPlaza.plazaName.toLowerCase() === plaza.plazaName.toLowerCase() && existingPlaza.id !== editPlazaId)) {
      setSuccessMessage('Ez a pláza név már létezik!');
      setOpenSnackbar(true);
      return;
    }
  
    if (plaza.openingTime >= plaza.closingTime) {
      setSuccessMessage('A nyitási idő nem lehet később, mint a zárási idő!');
      setOpenSnackbar(true);
      return;
    }
  
    const endpoint = isEditing ? '/api/plazas/update' : '/api/plazas/create';
    const method = isEditing ? 'PUT' : 'POST';
    const payload = isEditing
      ? { ...plaza, id: editPlazaId }
      : { ...plaza };
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save plaza');
      }
  
      const data = await response.json();
      console.log('Plaza successfully saved:', data);
      fetchPlazas();
  
      setPlaza({
        plazaName: '',
        location: '',
        cityId: '',
        openingTime: '',
        closingTime: '',
        email: '',
        phone: '',
        image: '',
        description: '',
        leafletMapId: '',
        countyId: '',
        plazaStores: [],
      });
  
      setSuccessMessage(`Pláza sikeresen ${isEditing ? 'módosítva' : 'létrehozva'}!`);
      setOpenSnackbar(true);
      setIsEditing(false);
      setEditPlazaId(null);
    } catch (error) {
      console.error('Error saving plaza:', error);
      setSuccessMessage(`Hiba történt: ${(error as Error).message}`);
      setOpenSnackbar(true);
    }
  };

  const handleDeletePlaza = async (id: string) => {
    try {
      const response = await fetch('/api/plazas/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setPlazas(plazas.filter(plaza => plaza.id !== id));
        setSuccessMessage('Pláza sikeresen törölve!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting plaza:', error);
    }
  };

  const handleEditPlaza = (plaza: any) => {
    setPlaza({
      plazaName: plaza.plazaName,
      location: plaza.location,
      cityId: plaza.cityId,
      openingTime: plaza.openingTime,
      closingTime: plaza.closingTime,
      email: plaza.email,
      phone: plaza.phone,
      image: plaza.image,
      description: plaza.description,
      leafletMapId: plaza.leafletMapId,
      countyId: plaza.countyId,
      plazaStores: plaza.plazaStores ? plaza.plazaStores.map((store: any) => store.id.toString()) : [],
    });
    setEditPlazaId(plaza.id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setPlaza({
      plazaName: '',
      location: '',
      cityId: '',
      openingTime: '',
      closingTime: '',
      email: '',
      phone: '',
      image: '',
      description: '',
      leafletMapId: '',
      countyId: '',
      plazaStores: [],
    });
    setEditPlazaId(null);
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage('');
  };

  return (
    <>
      <Box sx={{ padding: 2, mt: '200px', mb: "200px" }} id='plazaSection'>
        <Typography variant="h4" gutterBottom>
          Pláza Hozzáadás
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pláza neve"
                name="plazaName"
                value={plaza.plazaName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.plazaName}
                helperText={errors.plazaName}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Helyszín"
                name="location"
                value={plaza.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.location}
                helperText={errors.location}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.cityId}>
                <InputLabel>Város</InputLabel>
                <Select
                  value={plaza.cityId}
                  onChange={handleSelectChange}
                  name="cityId"
                  label="Város"
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.cityId && <Typography variant="caption" color="error">{errors.cityId}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.countyId}>
                <InputLabel>Megye</InputLabel>
                <Select
                  value={plaza.countyId}
                  onChange={handleSelectChange}
                  name="countyId"
                  label="Megye"
                >
                  {counties.map((county) => (
                    <MenuItem key={county.id} value={county.id}>
                      {county.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.countyId && <Typography variant="caption" color="error">{errors.countyId}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.leafletMapId}>
                <InputLabel>Leaflet Térkép</InputLabel>
                <Select
                  value={plaza.leafletMapId}
                  onChange={handleSelectChange}
                  name="leafletMapId"
                  label="Leaflet Térkép"
                >
                  {leafletMaps.map((map: any) => (
                    <MenuItem key={map.id} value={map.id}>
                      {map.plazaMapName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.leafletMapId && <Typography variant="caption" color="error">{errors.leafletMapId}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nyitási idő"
                name="openingTime"
                value={plaza.openingTime}
                onChange={handleChange}
                onBlur={handleBlur}
                type="time"
                InputLabelProps={{ shrink: true }}
                error={!!errors.openingTime}
                helperText={errors.openingTime}
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zárási idő"
                name="closingTime"
                value={plaza.closingTime}
                onChange={handleChange}
                onBlur={handleBlur}
                type="time"
                InputLabelProps={{ shrink: true }}
                error={!!errors.closingTime}
                helperText={errors.closingTime}
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={plaza.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefonszám"
                name="phone"
                value={plaza.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kép URL"
                name="image"
                value={plaza.image}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.image}
                helperText={errors.image}
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Leírás"
                name="description"
                value={plaza.description}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Pláza Boltok</Typography>
                <Typography variant="h6" sx={{ color:"red" }}><WarningIcon 
                sx={{ 
                  height: "30px", 
                  width: "30px" 
                  }}
                >
                  </WarningIcon>MÓDOSÍTÁS ESETÉN ÚJRA BE KELL PIPÁLNI A PLÁZÁBAN LÉVŐ BOLTOKAT !!! KÜLÖNBEN ELVESZNEK<WarningIcon 
                sx={{ 
                  height: "30px", 
                  width: "30px" }}
                >
                  </WarningIcon>
                </Typography> 
              {plazaStores.map((store: any) => (
                <FormControlLabel
                  key={store.id}
                  control={
                    <Checkbox
                      checked={plaza.plazaStores.includes(store.id.toString())}
                      onChange={handleStoreChange}
                      value={store.id}
                    />
                  }
                  label={store.name}
                />
              ))}
            </Grid>


            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {isEditing ? 'Pláza Módosítás Mentése' : 'Pláza Mentése'}
              </Button>
              {isEditing && (
                <Button variant="outlined" color="secondary" onClick={handleCancelEdit} sx={{ ml: 2 }}>
                  Mégse
                </Button>
              )}
            </Grid>
          </Grid>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {plazas.map((plaza: any) => (
                <React.Fragment key={plaza.id}>
                  <TableRow>
                    <TableCell align="center">Műveletek</TableCell> 
                    <TableCell align="center">ID</TableCell> 
                    <TableCell align="center">Pláza neve</TableCell>
                    <TableCell align="center">Helyszín</TableCell>
                    <TableCell align="center">Nyitvatartás</TableCell>
                    <TableCell align="center">Város</TableCell>
                    <TableCell align="center">Megye</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Kép</TableCell>
                    <TableCell align="center">Leírás</TableCell>
                    <TableCell align="center">Térkép</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>
                      <Button variant='outlined' color='secondary' onClick={() => handleDeletePlaza(plaza.id)} sx={{ mb: 2 }}>Törlés</Button> 
                      <Button variant='outlined' color='primary' onClick={() => handleEditPlaza(plaza)}>Módosítás</Button>
                    </TableCell>
                    <TableCell align="center">{plaza.id}</TableCell>
                    <TableCell align="center">{plaza.plazaName}</TableCell>
                    <TableCell align="center">{plaza.location}</TableCell>
                    <TableCell align="center">{plaza.openingTime} - {plaza.closingTime}</TableCell>
                    <TableCell align="center">{cities.find(city => city.id === plaza.cityId)?.name}</TableCell>
                    <TableCell align="center">{counties.find(county => county.id === plaza.countyId)?.name}</TableCell>
                    <TableCell align="center">{plaza.email}</TableCell>
                    <TableCell align="center">{plaza.phone}</TableCell>
                    <TableCell align="center">{plaza.image}</TableCell>
                    <TableCell align="center">{plaza.description}</TableCell>
                    <TableCell align="center">{leafletMaps.find(map => map.id === plaza.leafletMapId)?.plazaMapName}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default MuiPlaza;