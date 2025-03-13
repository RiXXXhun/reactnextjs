"use client";
import React from "react";
import { Box } from "@mui/material";

export default function Linebar() {
    return (
        <Box
            sx={{
                marginTop: "60px",
                height: "80px",
                width: "100%",
                backgroundColor: "#161C27",
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

            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    height: "4px",
                    width: "20%",
                    backgroundColor: "#1E90FF",
                    transform: "translateY(-50%)",
                    animation: `moveLine 8s linear infinite`,
                }}
            />
            <style jsx global>{`
                @keyframes moveLine {
                    0% {
                        left: 0;
                    }
                    50% {
                        left: 80%;
                    }
                    100% {
                        left: 0%;
                    }
                }
            `}</style>
        </Box>
    );
}
