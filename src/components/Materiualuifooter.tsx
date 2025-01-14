"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachmentIcon from '@mui/icons-material/Attachment';

function Materialuifooter() {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom display="flex" justifyContent="center" alignItems="center">
              <AttachmentIcon sx={{ mr: 1 }} /> Column 1
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 1</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 2</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 3</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom display="flex" justifyContent="center" alignItems="center">
              <AttachmentIcon sx={{ mr: 1 }} /> Column 2
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 1</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 2</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 3</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom display="flex" justifyContent="center" alignItems="center">
              <AttachmentIcon sx={{ mr: 1 }} /> Column 3
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 1</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 2</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AlternateEmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">Item 3</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Materialuifooter;
