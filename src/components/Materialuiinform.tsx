"use client"
import React from 'react';
import { Grid, Typography, Card, CardContent, Box, Container } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AppsIcon from '@mui/icons-material/Apps';
import DiscountIcon from '@mui/icons-material/Discount';
import BusinessIcon from '@mui/icons-material/Business';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const cardData = [
  {
    title: 'Lehetőségek',
    description: 'Fedezze fel a legjobb plázákat és bevásárlóközpontoan Magyaroszág Nyugat-Dunántúli régiójában pár kattintással, könnyen és gyorsan!',
    icon: <AppsIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'H-SZ Ügyfélszolgálat',
    description: 'Bármikor kérdése van vagy esetleg hibát talált az oldalunkon ? Mi itt vagyunk, hogy segítsünk a tökéletes vásárlási élményben!',
    icon: <SupportAgentIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Regisztráció nélkül is',
    description: 'Kereshet plázákat és bevásárlóközpontokat, valamint használhat kuponokat anélkül, hogy fiókot kellene létrehoznia.',
    icon: <AppRegistrationIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Kedvezmények',
    description: 'Spóroljon meg többet! Használja exkluzív kuponokat és akciókat, hogy még jobb áron vásárolhasson!',
    icon: <DiscountIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Cégünk',
    description: ' Szenvedélyünk a vásárlás egyszerűbbé tétele mindenki számára – a PlázaÁsz a legjobb társa a plázák világában!',
    icon: <BusinessIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
];

const Materialuiinform = () => {
  return (
    <Container sx={{ backgroundColor: '#1c2331', margin: '30px auto 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} id="informSection">
      <Box sx={{ padding: '20px', backgroundColor: '#1c2331', borderRadius: '16px', pt: "20px", zIndex: 1000 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ color: '#ffffff', textAlign: 'center', marginBottom: '30px', zIndex: 1000 }}
            >
              Tudnivalók
            </Typography>
          </Grid>

          {cardData.map((card, index) => (
            <Grid item xs={12} sm={8} md={4} lg={4} key={index}>
              <Card 
                sx={{ 
                  borderRadius: '16px', 
                  boxShadow: 3, 
                  textAlign: 'center', 
                  padding: '20px', 
                  backgroundColor: '#161C27', 
                  color: '#ffffff', 
                  pt: "50px",
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)', 
                  },
                  zIndex: 1000,
                }}
              >
                <Box
                  sx={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto 16px',
                    backgroundColor: '#DAFFC4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                  }}
                >
                  {card.icon}
                </Box>
                <CardContent sx={{ zIndex: 1000 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ffffff', zIndex: 1000 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff', zIndex: 1000 }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Materialuiinform;