"use client"
import React from 'react';
import { Grid, Typography, Card, CardContent, Box, Container } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AppsIcon from '@mui/icons-material/Apps';
import DiscountIcon from '@mui/icons-material/Discount';
import BusinessIcon from '@mui/icons-material/Business';

const cardData = [
  {
    title: 'Lehetőségek',
    description: 'Késöbbiekben fedezze fel az exkluzív funkciókat és személyre szabott élményeket, amelyek csak regisztrált tagok számára érhetők el!',
    icon: <AppsIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Közösség és Kapcsolat',
    description: 'Csatlakozzon egy aktív plázás közösséghez, vásároljon és ossza meg tapasztalatait.',
    icon: <AppsIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: '24/7 Ügyfélszolgálat',
    description: 'Regisztrált tagként bármikor elérhet minket! Kérdése van? Mi mindig itt vagyunk, hogy segítsünk. (Nem regisztrált tagoknak is elérhető az ügyfélszolgálatunk)',
    icon: <SupportAgentIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
];

const Materialuiinform = () => {
  return (
    <Container sx={{ backgroundColor: '#1c2331', margin: '30px auto 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ padding: '20px', backgroundColor: '#1c2331', borderRadius: '16px', pt: "20px" }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ color: '#ffffff', textAlign: 'center', marginBottom: '30px' }}
            >
              Regisztrációval járó jutalmak
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
                  }}
                >
                  {card.icon}
                </Box>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ffffff' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
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
