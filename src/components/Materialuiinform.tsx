"use client"
import React from 'react';
import { Grid, Typography, Card, CardContent, Box, Container } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import DiscountIcon from '@mui/icons-material/Discount';

const cardData = [
  {
    title: '24/7 Ügyfélszolgálat',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <SupportAgentIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Lehetőségek',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <AppsIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Kedvezmények',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <DiscountIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
  {
    title: 'Cégünk',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <BusinessIcon style={{ width: '30px', height: '30px', color: '#1c2331' }} />,
  },
];

const Materialuiinform = () => {
  return (
    <Container sx={{ backgroundColor: '#1c2331', margin: '30px auto 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ padding: '20px', backgroundColor: '#1c2331', borderRadius: '16px' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#ffffff', textAlign: 'center' }}>
              Tudnivalók
            </Typography>
          </Grid>

          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card sx={{ borderRadius: '16px', boxShadow: 3, textAlign: 'center', padding: '20px', backgroundColor: '#1c2331', color: '#ffffff' }}>
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
