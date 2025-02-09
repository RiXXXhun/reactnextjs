"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.05s ease-out",
        mixBlendMode: "difference",
      }}
    />
  );
};

export default CustomCursor;
