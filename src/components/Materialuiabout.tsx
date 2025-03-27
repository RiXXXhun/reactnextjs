import React from 'react';
import { Box, Container, Typography, IconButton, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const AboutUs: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '75px',
        width: '100%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#1c2331',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#161C27',
          borderRadius: '10px',
          marginTop: '150px',
          marginBottom: '150px',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
          },
        }}
      >
        <Typography
          variant="h4"
          component="p"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: 'white',
            marginBottom: '30px',
          }}
        >
          Rólunk
        </Typography>
        <Typography
          variant="body1"
          component="p"
          align="center"
          gutterBottom
          sx={{
            fontSize: "20px",
            marginBottom: '60px',
            color: 'white',
          }}
        >
          A Plázaász mögött egy lelkes, innovatív csapat áll, akik szenvedélyesen dolgoznak azon, hogy a vásárlás egyszerűbb és kényelmesebb legyen mindenki számára. <br />
          Hármunk közös célja, hogy a Plázaász ne csupán egy plázakereső oldal legyen, hanem egy igazi élmény minden vásárlónak. Egy hely, ahol gyorsan és egyszerűen megtalálhatod a legjobb bevásárlóközpontokat, üzleteket és még kuponokat is használhatnak.
        </Typography>

        <Typography
          variant="body1"
          component="p"
          align="center"
          gutterBottom
          sx={{
            fontSize: "20px",
            marginBottom: '60px',
            color: 'white',
          }}
        >
                  „Plázák és boltok egy kattintásra – gyors keresés, könnyű felfedezés!”
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '50px',
          }}
        >
          <IconButton
            component="a"
            href="/_not_found"
            sx={{
              width: 40,
              height: 40,
              color: 'white',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
            }}
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            component="a"
            href="/_not_found"
            sx={{
              width: 40,
              height: 40,
              color: 'white',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
            }}
          >
            <TwitterIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            component="a"
            href="/_not_found"
            sx={{
              width: 40,
              height: 40,
              color: 'white',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
            }}
          >
            <LinkedInIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            component="a"
            href="/_not_found"
            sx={{
              width: 40,
              height: 40,
              color: 'white',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
            }}
          >
            <FacebookIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
