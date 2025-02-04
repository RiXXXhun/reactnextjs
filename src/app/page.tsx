"use client"; 

import { Button, Box, Card } from "@mui/material";
import { useRouter } from "next/navigation";  

export default function Home() {
  const router = useRouter(); 

  const handleClick = () => {
    window.location.href = '/homepage'; 
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1c2331",
        width: "100vw",        
        height: "100vh",      
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",    
        padding: "16px",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          width: "300px",   
          height: "250px",   
          borderRadius: "16px",
          boxShadow: 3,
          textAlign: "center",
          display: "flex",      
          justifyContent: "center", 
          alignItems: "center",    
          padding: "20px",
          backgroundColor: "#161C27",
          color: "#ffffff",
          transition: "box-shadow 0.3s ease-in-out",
          '&:hover': {
            boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#161C27",
            color: "white",
            borderRadius: "8px",
            padding: "16px 32px", 
            textTransform: "none",
            fontSize: "18px",  
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(30, 144, 255, 0.8)",
            },
          }}
          onClick={handleClick}
        >
          Ugrás a Főoldalra
        </Button>
      </Card>
    </Box>
  );
}
