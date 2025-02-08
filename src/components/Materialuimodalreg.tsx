"use client";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Row } from 'react-bootstrap';
import { Checkbox, FormControlLabel, Link, TextField } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ open, onClose }: RegistrationModalProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Regisztráció
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <Row>
              <TextField
                required
                id="firstname"
                label="Vezetéknév"
                type="string"
              />
            </Row>
            <br />
            <Row>
              <TextField
                required
                id="lastname"
                label="Keresztnév"
                type="string"
              />
            </Row>
            <br />
            <Row>
              <TextField
                required
                id="email"
                label="Email"
                type="email"
              />
            </Row>
            <br />
            <Row>
              <TextField
                required
                id="password1"
                label="Jelszó"
                type="password"
              />
            </Row>
            <br />
            <Row>
              <TextField
                required
                id="password2"
                label="Jelszó megerősítés"
                type="password"
              />
            </Row>
            <br />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Elfogadom az adatkezelést"
            />
          </Typography>
          <br />
          <Link href="./homepage">
            <Button>Regisztráció</Button>
          </Link>
        </Box>
      </Fade>
    </Modal>
  );
}
