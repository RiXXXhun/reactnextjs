"use client";

import dynamic from 'next/dynamic';
import Materialuibackbutton from "@/components/Materialuibackbutton";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import { Box, CircularProgress, Typography } from "@mui/material";
import Materialuifooter from "@/components/Materiualuifooter";
import { useEffect, useState } from "react";


const Materialuisignin = dynamic(() => import('@/components/Materialuisignin'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1c2331",
          color: "white",
        }}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ marginTop: 2, fontSize: "18px" }}>
          Jelenleg az oldal betölt, kérem várjon...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <title>PLÁZAÁSZ Bejelentkezés</title>
      <Box
        sx={{
          backgroundColor: "#1c2331",
          minHeight: "100vh",
          color: "white",
          padding: "16px",
        }}
      >
        <ResponsiveAppBar />
        <Materialuibackbutton />
        <Materialuisignin />
        <Materialuifooter />
        <Materialuiscrollbutton />
      </Box>
    </>
  );
}