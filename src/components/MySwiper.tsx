"use client";

import React, { useEffect, useState } from "react";
import {Grid, Typography, Card, CardContent, Box, Container, Button } from "@mui/material";
import { getPlazas, getCities, getCounties } from "../services/api";

type Plaza = {
  id: string;
  plazaName: string;
  cityId: string;
  countyId: string;
};

type City = {
  id: string;
  name: string;
};

type County = {
  id: string;
  name: string;
};

const DynamicCardsComponent: React.FC = () => {
  const [data, setData] = useState<
    { county: string; city: string; plaza: string; route: string }[]
  >([])
;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counties: County[] = await getCounties(); 
        const cities: City[] = await getCities(); 
        const plazas: Plaza[] = await getPlazas(); 

        const combinedData = plazas.map((plaza: Plaza) => {
          const city = cities.find((c: City) => c.id === plaza.cityId)!; 
          const county = counties.find((co: County) => co.id === plaza.countyId)!; 

          return {
            county: county.name,
            city: city.name,
            plaza: plaza.plazaName,
            route: `/plazas/${plaza.id}`,
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "#1c2331",
        margin: "30px auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id="informSection"
    >
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#1c2331",
          borderRadius: "16px",
          pt: "20px",
        }}
      >
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                color: "#ffffff",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Vizuális gyorskeresés
            </Typography>
          </Grid>

          {data.map((item, index) => (
            <Grid item xs={12} sm={8} md={8} lg={5} key={index}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: 3,
                  textAlign: "center",
                  mr: "30px",
                  pt: "10px",
                  backgroundColor: "#161C27",
                  color: "#ffffff",
                  transition: "box-shadow 0.3s ease-in-out",
                  minHeight: "25vh", 
                  "&:hover": {
                    boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <img
                      src="/Logo.png"
                      alt="Logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    {item.county}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    {item.city}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#bbb",
                      marginBottom: "20px",
                    }}
                  >
                    {item.plaza}
                  </Typography>
                  <Button
                    variant="contained"
                    href={item.route}
                    sx={{
                      backgroundColor: "#00bcd4",
                      "&:hover": {
                        backgroundColor: "#1c2331",
                        color: "#ffffff",
                      },
                    }}
                  >
                    Tovább
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default DynamicCardsComponent;
