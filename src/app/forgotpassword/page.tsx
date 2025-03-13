"use client";

import Materialuibackbutton from "@/components/Materialuibackbutton";
import Materialuiforgotpass from "@/components/Materialuiforgotpass";
import ResponsiveAppBar from "@/components/Materialuinavbar";
import MaterialuiNewPassword from "@/components/MaterialuiNewPassword";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuifooter from "@/components/Materiualuifooter";
import { Box } from "@mui/material";

export default function Page() {
  
  return (
    <>

          <title>PLÁZAÁSZ Jelszó elfelejtés</title>
          
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
      
      <Materialuiforgotpass /> 
      
      <Materialuifooter />

      <Materialuiscrollbutton />
    </Box>
    </>
  );
}
