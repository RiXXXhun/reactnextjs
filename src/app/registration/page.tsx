"use client";

import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuifooter from "@/components/Materiualuifooter";
import { Box } from "@mui/material";
import Materialuisignup from "@/components/Materialuisignup";
import Materialuisignupjo from "@/components/Materialuisignupjo";
import Materialuicardreg from "@/components/Materialuicardreg";
import Materialuibackbutton from "@/components/Materialuibackbutton";

export default function Page() {
  return (
      <>
          <title>PLÁZAÁSZ Regisztráció</title>
          <link rel="icon" href="/LogoIcon.ico" />
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

      <Materialuisignupjo />

      <Materialuicardreg />
      
      <Materialuifooter />

      <Materialuiscrollbutton />
    </Box>
    </>
  );
}
