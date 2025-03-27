"use client";

import ResponsiveAppBar from "@/components/Materialuinavbar";
import Materialuiscrollbutton from "@/components/Materialuiscrollbutton";
import Materialuifooter from "@/components/Materiualuifooter";
import { Box, CircularProgress, Typography, Card, CardContent, Grid } from "@mui/material";
import Materialuibackbutton from "@/components/Materialuibackbutton";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DescriptionIcon from '@mui/icons-material/Description';
import ExploreIcon from '@mui/icons-material/Explore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MouseIcon from '@mui/icons-material/Mouse';


interface PlazaData {
  id: number;
  plazaName: string;
  location: string;
  city: { name: string };
  county: { name: string };
  openingTime: string;
  closingTime: string;
  email: string;
  phone: string;
  image: string;
  description: string;
  plazaStores: { name: string; openingTime: string; closingTime: string; description: string }[];
  leafletMap: {
    plazaMapName: string;
    latitude: number;
    longitude: number;
  };
}


export default function Page() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [plazaData, setPlazaData] = useState<PlazaData | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/plazas/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Hiba: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setPlazaData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching plaza data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1c2331",
          color: "white",
        }}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ marginTop: 2, fontSize: "18px" }}>
          Jelenleg az oldal betölt, kérem várjon...
        </Typography>
      </Box>
    );
  }

  if (!plazaData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#1c2331",
          color: "white",
        }}
      >
        <Typography sx={{ marginTop: 2, fontSize: "18px" }}>
          Nem található adat a megadott ID alapján.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <title>{plazaData.plazaName} Plaza </title>

      <Box
        sx={{
          backgroundColor: "#1c2331",
          minHeight: "100vh",
          color: "white",
          padding: "16px",
        }}
      >
        <ResponsiveAppBar />

        <Box sx={{ marginTop: "50px" }}>
          <Materialuibackbutton />

          <Typography variant="h4" sx={{ color: "white", mb: "50px", textAlign: "center" }}>
            {plazaData.plazaName} <StorefrontIcon sx={{ height: "50px", width: "50px" }}></StorefrontIcon>
          </Typography>

            <Box
            sx={{
              mt: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "10px solid #161C27",
              borderRadius: '16px',
              boxShadow: 3,
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
              boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
              overflow: "hidden",
              height: { xs: "auto", sm: "600px" },
              width: { xs: "100%", sm: "800px" },
              marginBottom: "50px",
              margin: "0 auto",
            }}
            >
            <img
              src={plazaData.image} 
              alt={plazaData.plazaName} 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            </Box>

            <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "50px" }}>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
              backgroundColor: "#161C27",
              color: "white",
              borderRadius: '16px',
              boxShadow: 3,
              transition: 'box-shadow 0.3s ease-in-out',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
              }}>
              <CardContent>
                <Typography variant="h6">Pontos földrajzi cím <PlaceIcon sx={{ height: "30px", width: "30px" }}></PlaceIcon> </Typography>
                <Typography variant="body1">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plazaData.location)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {plazaData.location} <MouseIcon sx={{ height: "20px", width: "20px" }}></MouseIcon>
                </a>
                </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
              backgroundColor: "#161C27",
              color: "white",
              borderRadius: '16px',
              boxShadow: 3,
              transition: 'box-shadow 0.3s ease-in-out',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
              }}>
              <CardContent>
                <Typography variant="h6">Város <LocationCityIcon sx={{ height: "30px", width: "30px" }}></LocationCityIcon> </Typography>
                <Typography variant="body1">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plazaData.city.name)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {plazaData.city.name} <MouseIcon sx={{ height: "20px", width: "20px" }}></MouseIcon>
                </a>
                </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
              backgroundColor: "#161C27",
              color: "white",
              borderRadius: '16px',
              boxShadow: 3,
              transition: 'box-shadow 0.3s ease-in-out',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
              }}>
              <CardContent>
                <Typography variant="h6">Vármegye <FlagIcon sx={{ height: "30px", width: "30px" }}></FlagIcon> </Typography>
                <Typography variant="body1">
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(plazaData.county.name)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {plazaData.county.name} <MouseIcon sx={{ height: "20px", width: "20px" }}></MouseIcon>
                </a>
                </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
                backgroundColor: "#161C27",
                color: "white",
                borderRadius: '16px',
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out',
                minHeight: '10vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                '&:hover': {
                  boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
                },
              }}>
                <CardContent>
                  <Typography variant="h6">Nyitás időpontja - Zárás időpontja <BrowseGalleryIcon sx={{ height: "30px", width: "30px" }}></BrowseGalleryIcon>  </Typography>
                  <Typography variant="body1">{plazaData.openingTime} - {plazaData.closingTime}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
              backgroundColor: "#161C27",
              color: "white",
              borderRadius: '16px',
              boxShadow: 3,
              transition: 'box-shadow 0.3s ease-in-out',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
              }}>
              <CardContent>
                <Typography variant="h6">Email cím <AlternateEmailIcon sx={{ height: "30px", width: "30px" }}></AlternateEmailIcon></Typography>
                <Typography variant="body1">
                <a 
                  href={`mailto:${plazaData.email}`} 
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {plazaData.email} <MouseIcon sx={{ height: "20px", width: "20px" }}></MouseIcon>
                </a>
                </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
              backgroundColor: "#161C27",
              color: "white",
              borderRadius: '16px',
              boxShadow: 3,
              transition: 'box-shadow 0.3s ease-in-out',
              minHeight: '10vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
              }}>
              <CardContent>
                <Typography variant="h6">Telefonszám  <LocalPhoneIcon sx={{ height: "30px", width: "30px" }}></LocalPhoneIcon></Typography>
                <Typography variant="body1">
                <a 
                  href={`tel:${plazaData.phone}`} 
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {plazaData.phone} <MouseIcon sx={{ height: "20px", width: "20px" }}></MouseIcon>
                </a>
                </Typography>
              </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
                backgroundColor: "#161C27",
                color: "white",
                borderRadius: '16px',
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out',
                minHeight: '10vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                '&:hover': {
                  boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
                },
              }}>
                <CardContent>
                  <Typography variant="h6">Leírás <DescriptionIcon sx={{ height: "30px", width: "30px" }}></DescriptionIcon> </Typography>
                  <Typography variant="body1">{plazaData.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card sx={{
                backgroundColor: "#161C27",
                color: "white",
                borderRadius: '16px',
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out',
                minHeight: '10vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                '&:hover': {
                  boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
                },
              }}>
                <CardContent>
                  <Typography variant="h6">Szélesség - Magasság <ExploreIcon sx={{ height: "30px", width: "30px" }}></ExploreIcon> </Typography>
                  <Typography variant="body1">{plazaData.leafletMap.latitude}° - {plazaData.leafletMap.longitude}°</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h4" sx={{ color: "white", mt: "50px", textAlign: "center" }}>
            Boltok <ShoppingCartIcon sx={{ height: "50px", width: "50px" }}></ShoppingCartIcon>
          </Typography>

          <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px" }}>
            {plazaData.plazaStores.map((store, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  backgroundColor: "#161C27",
                  color: "white",
                  borderRadius: '16px',
                  boxShadow: 3,
                  transition: 'box-shadow 0.3s ease-in-out',
                  minHeight: '10vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
                  },
                }}>
                  <CardContent>
                    <Typography variant="h6">{store.name}</Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      Nyitvatartás (NY-Z): {store.openingTime} - {store.closingTime}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>{store.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Materialuifooter />

        <Materialuiscrollbutton />
      </Box>
    </>
  );
}