"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";
import DoneIcon from '@mui/icons-material/Done';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          zIndex: 9998, 
        }}
      />


      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#161C27",
            color: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            minWidth: { xs: "90%", sm: "400px", md: "450px" },
            textAlign: "center",
            transition: "box-shadow 0.3s ease-in-out",
            boxShadow: 3,
            "&:hover": {
              boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
            },
          }}
        >

          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#DAFFC4" }}>
            <CookieIcon fontSize="large" sx={{ color: "#DAFFC4" }} /> Sütik 
          </Typography>


          <Typography variant="body1" sx={{ color: "#DAFFC4", mt: 1 }}>
            Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében.
          </Typography>


          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            sx={{ mt: 2 }}
          >
            Megértettem! <DoneIcon />
          </Button>
        </Paper>
      </Box>
    </>
  );
}
