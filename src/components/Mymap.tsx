"use client";
import React from "react";
import { Container, Box, TextField, IconButton, InputAdornment, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchIcon from "@mui/icons-material/Search";
import { LatLngExpression } from "leaflet";

const position: LatLngExpression = [47.1625, 19.5033]; 
const zoom = 7;


const hungaryGeoJson: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Hungary Boundary" },
      geometry: {
        type: "LineString", 
        coordinates: [
          [16.2022, 46.8524],
          [16.5342, 47.4955],
          [16.9596, 47.8818],
          [18.8319, 48.5852],
          [19.6618, 48.2666],
          [20.8174, 48.65],
          [22.0856, 48.4223],
          [22.7105, 48.0954],
          [22.0998, 47.3346],
          [21.5202, 46.7403],
          [21, 46.3249],
          [18.8298, 45.9089],
          [17.6301, 46.1662],
          [16.2022, 46.8524], 
        ],
      },
    },
  ],
};

const MyMap: React.FC = () => {
  return (
    <Container
      sx={{ backgroundColor: "#1c2331", py: 5, minHeight: "24vh", maxWidth: "lg", mx: "auto", pt: "100px" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 10 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 5 }}>
          Magyarország határvonalai
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Gyorskeresés..."
          sx={{
            position: 'relative',
            top: '-100px',
            width: {
              xs: '90%', 
              sm: '70%', 
              md: '50%', 
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{ color: 'white' }} onClick={() => { /* keresési logika */ }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: '25px',
              border: '2px solid white',
              color: 'white',
              backgroundColor: '#1c2331',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          border: "10px solid #161C27",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={position}
          zoom={zoom}
          style={{
            height: "800px",
            width: "100%",
            backgroundColor: "#1c2331",
          }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            data={hungaryGeoJson}
            style={{
              color: "red", 
              weight: 3, 
              opacity: 1,
              dashArray: "5,5", 
            }}
          />
          <Marker position={position}>
            <Popup>Magyarország középpontja</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Container>
  );
};

export default MyMap;
