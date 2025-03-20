"use client";

import Materialuiabout from "@/components/Materialuiabout";
import Materialuiaboutmembers from "@/components/Materialuiaboutmembers";
import Materialuibackbutton from "@/components/Materialuibackbutton";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuisignin from "@/components/Materialuisignin";
import Materialuisupport from "@/components/Materialuisupport";
import Materialuifooter from "@/components/Materiualuifooter";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {

  const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
            setOpen(true);
        }, 600);

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

          <title>PLÁZAÁSZ Ügyfélszolgálat</title>
          
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

      <Materialuisupport />
      
      <Materialuifooter />

      <Materialuiscrollbutton />
    </Box>
    </>
  );
}
