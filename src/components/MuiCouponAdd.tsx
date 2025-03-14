import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Store {
  id: number;
  name: string;
}

interface Coupon {
  id: number;
  qrCode: string;
  discount: number;
  validFrom: string;
  validUntil: string;
  usageDetails: string;
  storeId: number;
}

const CouponForm: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [validFrom, setValidFrom] = useState<string>('');
  const [validUntil, setValidUntil] = useState<string>('');
  const [usageDetails, setUsageDetails] = useState<string>('');
  const [storeId, setStoreId] = useState<number | ''>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('error');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/stores');
        const data = await response.json();
        if (response.ok) {
          setStores(data);
        } else {
          console.error('Hiba a boltok betöltésekor:', data.message);
        }
      } catch (error) {
        console.error('Hiba a boltok betöltésekor:', error);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch('/api/coupons');
        const data = await response.json();
        if (response.ok) {
          setCoupons(data);
        } else {
          console.error('Hiba a kuponok betöltésekor:', data.message);
        }
      } catch (error) {
        console.error('Hiba a kuponok betöltésekor:', error);
      }
    };
    fetchCoupons();
  }, []);


  const generateQrCode = (discount: number) => {
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return `PLÁZAÁSZ-${discount}-${randomNumbers}`;
  };

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const validFromDate = new Date(validFrom);
  const validUntilDate = new Date(validUntil);

  const validateForm = () => {
    if (discount <= 0 || discount > 99) {
      setAlertMessage('Kedvezménynek 1 és 99 közötti egész számnak kell lennie!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return false;
    }


    if (validFromDate < today) {
      setAlertMessage('Az érvényesség kezdete nem lehet a mai napnál régebbi!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return false;
    }

    if (validUntilDate < validFromDate) {
      setAlertMessage('Az érvényesség vége nem lehet korábbi, mint az érvényesség kezdete!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return false;
    }

    if (storeId === '') {
      setAlertMessage('A bolt kiválasztása kötelező!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;


    const qrCode = generateQrCode(discount);
    const couponData = {
      qrCode,
      discount,
      validFrom,
      validUntil,
      usageDetails,
      storeId,
    };

    try {
      const response = await fetch('/api/coupons/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('A kupon sikeresen hozzáadva!');
        setAlertSeverity('success');
        setCoupons((prevCoupons) => [...prevCoupons, data]);
        setDiscount(0);
        setValidFrom('');
        setValidUntil('');
        setUsageDetails('');
        setStoreId('');
      } else {
        setAlertMessage(data.message || 'Hiba történt a kupon hozzáadásakor!');
        setAlertSeverity('error');
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error creating coupon:', error);
      setAlertMessage('Hiba történt a kupon hozzáadásakor!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteCoupon = async (couponId: number) => {
    try {
      const response = await fetch(`/api/coupons/delete?id=${couponId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('A kupon sikeresen törölve!');
        setAlertSeverity('success');

        setCoupons(coupons.filter((coupon) => coupon.id !== couponId));
      } else {
        setAlertMessage(data.message || 'Hiba történt a kupon törlésekor!');
        setAlertSeverity('error');
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting coupon:', error);
      setAlertMessage('Hiba történt a kupon törlésében!');
      setAlertSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ marginTop: "200px" }} id='couponSection'>
      <h2 >Új kupon hozzáadása</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Kedvezmény (%)"
            
            type="number"
            fullWidth
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Érvényesség kezdete"
              type="date"
              fullWidth
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Érvényesség vége"
              type="date"
              fullWidth
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Felhasználási módja"
            multiline
            rows={4}
            fullWidth
            value={usageDetails}
            onChange={(e) => setUsageDetails(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="store-select-label">Bolt</InputLabel>
            <Select
              labelId="store-select-label"
              value={storeId}
              onChange={(e) => setStoreId(Number(e.target.value))}
              label="Bolt"
            >
              {stores.length > 0 ? (
                stores.map((store) => (
                  <MenuItem key={store.id} value={store.id}>
                    {store.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nincs elérhető bolt</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Kupon hozzáadása
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: "20px", width: "100%", mb: "100px" }}>
        <Table aria-label="Coupons Data">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">QR Kód</TableCell>
              <TableCell align="center">Kedvezmény</TableCell>
              <TableCell align="center">Érvényesség kezdete</TableCell>
              <TableCell align="center">Érvényesség vége</TableCell>
              <TableCell align="center">Bolt id</TableCell>
              <TableCell align="center">Felhasználási módja</TableCell>
              <TableCell align="center">Műveletek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell align="center">{coupon.id}</TableCell>
                <TableCell align="center">{coupon.qrCode}</TableCell>
                <TableCell align="center">{coupon.discount}%</TableCell>
                <TableCell align="center">{new Date(coupon.validFrom).toLocaleDateString()}</TableCell>
                <TableCell align="center">{new Date(coupon.validUntil).toLocaleDateString()}</TableCell>
                <TableCell align="center">{coupon.storeId}</TableCell>
                <TableCell align="center">{coupon.usageDetails}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteCoupon(coupon.id)}
                  >
                    Törlés
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CouponForm;
