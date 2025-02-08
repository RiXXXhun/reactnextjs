"use client";

import Materialuiabout from "@/components/Materialuiabout";
import Materialuiaboutmembers from "@/components/Materialuiaboutmembers";
import Materialuibackbutton from "@/components/Materialuibackbutton";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuisignin from "@/components/Materialuisignin";
import Materialuifooter from "@/components/Materiualuifooter";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>

          <title>PLÁZAÁSZ Rólunk</title>
          
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
      
      <Materialuiabout />

      <Materialuiaboutmembers />
      
      <Materialuifooter />

      <Materialuiscrollbutton />
    </Box>
    </>
  );
}
