import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

interface AddCouponProps {
  onCouponAdded: () => void;
}

const AddCoupon = ({ onCouponAdded }: AddCouponProps) => {
  const [qrCode, setQrCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrCode || !barcode || !discount) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }

    if (parseInt(discount) <= 0 || discount === '') {
      setError('A kedvezménynek pozitív egész számnak kell lennie!');
      return;
    }

    try {
      const response = await fetch('/api/coupons/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCode, barcode, discount }),
      });

      const data = await response.json();

      if (data.success) {
        setQrCode('');
        setBarcode('');
        setDiscount('');
        setError(null);
        onCouponAdded(); 
      } else {
        setError(data.message || 'Hiba történt a kupon hozzáadásakor');
      }
    } catch (error) {
      setError('Hiba történt a kupon hozzáadásakor');
    }
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d+$/.test(value) || value === '') {
      setDiscount(value);
    }
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>Új kupon hozzáadása</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="QR Kód"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Vonalkód"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Kedvezmény (%)"
          type="text"
          value={discount}
          onChange={handleDiscountChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Kupon hozzáadása
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddCoupon;
