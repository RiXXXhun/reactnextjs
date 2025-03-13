import React, { useEffect } from "react";
import { Container, Box, TextField, IconButton, InputAdornment, Typography } from "@mui/material";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchIcon from "@mui/icons-material/Search";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { LatLngExpression } from "leaflet";
import L from "leaflet"; 

const position: LatLngExpression = [47.1625, 19.5033]; 
const zoom = 7;
const budapestPosition: LatLngExpression = [47.4979, 19.0402];


const randomPlaces = [
  { name: "Parlament", position: [47.5079, 19.0450] as LatLngExpression, link: "https://hu.wikipedia.org/wiki/Országház" },
  { name: "Hősök tere", position: [47.5145, 19.0760] as LatLngExpression, link: "https://hu.wikipedia.org/wiki/H%C5%91s%C3%B6k_tere" },
  { name: "Buda Castle", position: [47.4969, 19.0399] as LatLngExpression, link: "https://hu.wikipedia.org/wiki/Buda_V%C3%A1r" },
];



const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const MyMap: React.FC = () => {
  useEffect(() => {

    const customIcon = new L.Icon({
      iconUrl: '/Logo.png', 
      iconSize: [40, 40], 
      iconAnchor: [20, 40], 
      popupAnchor: [0, -40], 
    });
    

    L.Marker.prototype.options.icon = customIcon;
  }, []);

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
          position: "relative"
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
          

          <Marker position={budapestPosition}>
            <Popup>
              <Typography variant="body1">
                Továbbiak...
                <br />
                <a href="https://hu.wikipedia.org/wiki/Budapest" target="_blank" rel="noopener noreferrer">
                  Nyisd meg a Wikipédiát!
                </a>
              </Typography>
            </Popup>
          </Marker>

          {randomPlaces.map((place) => (
            <Marker key={place.name} position={place.position}>
              <Popup>
                <Typography variant="body1">
                  {place.name}
                  <br />
                  <a href={place.link} target="_blank" rel="noopener noreferrer">
                    Nyisd meg a Wikipédiát!
                  </a>
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
          <SpeedDial
            ariaLabel="SpeedDial example"
            icon={<SpeedDialIcon />}
            sx={{
              backgroundColor: "#161C27", 
              "& .MuiSpeedDialIcon-root": {
                backgroundColor: "#161C27", 
                color: "white",
              },
              "& .MuiSpeedDial-fab": {
                backgroundColor: "#161C27", 
                "&:hover": {
                  backgroundColor: "#161C27",
                }
              },
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                sx={{
                  backgroundColor: "#1c2331", 
                  color: "white", 
                  "&:hover": {
                    backgroundColor: "#1c2331", 
                  }
                }}
              />
            ))}
          </SpeedDial>
        </Box>
      </Box>
    </Container>
  );
};

export default MyMap;
