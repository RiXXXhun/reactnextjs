"use client";
import React from "react";
import { Box } from "@mui/material";

export default function Linebar() {
    return (
        <Box
            sx={{
                marginTop: "40px",
                mb: "30px",
                height: "30px",
                width: "100%",
                backgroundColor: "#1E2A47",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    height: "4px",
                    width: "100%",
                    backgroundColor: "#1E2A47",
                    transform: "translateY(-50%)",
                }}
            />
                
        </Box>
    );
}
