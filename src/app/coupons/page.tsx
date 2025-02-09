"use client";

import Materialuibackbutton from "@/components/Materialuibackbutton";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";

import Materialuifooter from "@/components/Materiualuifooter";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>

          <title>PLÁZAÁSZ Kuponok</title>
          
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
      
      

     
      <Materialuifooter />

      <Materialuiscrollbutton />
    </Box>
    </>
  );
}
