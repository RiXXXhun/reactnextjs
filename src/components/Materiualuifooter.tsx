import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#1c2331', color: 'white', paddingY: 5 }}>
      {/* Social Media Section */}
      <Box sx={{ backgroundColor: '#161C27' , padding: 2 }}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body1">Get connected with us on social networks:</Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Google />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit">
                <GitHub />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Links Section */}
      <Container sx={{ marginTop: 10 }}>
        <Grid container spacing={5}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Company name</Typography>
            <Box sx={{ width: 60, height: 2, backgroundColor: '#7c4dff', marginY: 1 }} />
            <Typography variant="body2">
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
          </Grid>

          {/* Products Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Products</Typography>
            <Box sx={{ width: 60, height: 2, backgroundColor: '#7c4dff', marginY: 1 }} />
            <Link href="#" color="inherit" display="block">MDBootstrap</Link>
            <Link href="#" color="inherit" display="block">MDWordPress</Link>
            <Link href="#" color="inherit" display="block">BrandFlow</Link>
            <Link href="#" color="inherit" display="block">Bootstrap Angular</Link>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Useful links</Typography>
            <Box sx={{ width: 60, height: 2, backgroundColor: '#7c4dff', marginY: 1 }} />
            <Link href="#" color="inherit" display="block">Your Account</Link>
            <Link href="#" color="inherit" display="block">Become an Affiliate</Link>
            <Link href="#" color="inherit" display="block">Shipping Rates</Link>
            <Link href="#" color="inherit" display="block">Help</Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact</Typography>
            <Box sx={{ width: 60, height: 2, backgroundColor: '#7c4dff', marginY: 1 }} />
            <Typography variant="body2">
              <i className="fas fa-home mr-3"></i> New York, NY 10012, US
            </Typography>
            <Typography variant="body2">
              <i className="fas fa-envelope mr-3"></i> info@example.com
            </Typography>
            <Typography variant="body2">
              <i className="fas fa-phone mr-3"></i> + 01 234 567 88
            </Typography>
            <Typography variant="body2">
              <i className="fas fa-print mr-3"></i> + 01 234 567 89
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright Section */}
      <Box sx={{ backgroundColor: '#161C27', textAlign: 'center', paddingY: 3, marginTop: '40px' }}>
        <Typography variant="body2">
          © 2020 Copyright: <Link href="https://mdbootstrap.com/" color="inherit">MDBootstrap.com</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
