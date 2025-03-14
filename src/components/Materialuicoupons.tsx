"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, Box, Container } from "@mui/material";
import QRCode from "react-qr-code";

const Materialuiinform = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/stores");
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Hiba a boltok lekérésekor:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("/api/coupons");
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error("Hiba a kuponok lekérésekor:", error);
      }
    };

    fetchCoupons();
  }, []);

  const getStoreName = (storeId: number) => {
    const store = stores.find((store) => store.id === storeId);
    return store ? store.name : "Ismeretlen bolt";
  };

  useEffect(() => {
    coupons.forEach((coupon) => {
      console.log(`Coupon ID: ${coupon.id}, QR Code: ${coupon.qrCode}`);
    });
  }, [coupons]);

  return (
    <Container
      sx={{
        backgroundColor: "#1c2331",
        margin: "30px auto 0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#1c2331",
          borderRadius: "16px",
          pt: "60px",
          pb: "60px",
        }}
      >
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                color: "#ffffff",
                textAlign: "center",
                marginBottom: "30px",
                textTransform: "uppercase",
              }}
            >
              Kuponok
            </Typography>
          </Grid>

          {coupons.map((card: any, index: number) => (
            <Grid item xs={12} sm={8} md={4} lg={4} key={index}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: 3,
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#161C27",
                  color: "#ffffff",
                  pt: "50px",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
                  },
                }}
              >
                <Box sx={{ marginBottom: "16px" }}>
                  <Typography variant="h5" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    {card.discount}%
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    margin: "0 auto 16px",
                    backgroundColor: "#161C27",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative", 
                  }}
                >
                  <QRCode
                    value={card.qrCode}
                    size={300}
                    bgColor="#161C27"
                    fgColor="#ffffff"
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "40px",
                      height: "40px",
                      backgroundImage: "url('/Logo.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    Felhasználási módja:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    {card.usageDetails}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    Bolt:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    {getStoreName(card.storeId)}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    Érvényesség:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ffffff", textTransform: "uppercase" }}>
                    {new Date(card.validFrom).toLocaleDateString()} - {new Date(card.validUntil).toLocaleDateString()}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Materialuiinform;
