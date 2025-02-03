import React, { useState } from "react";
import { Typography, Card, CardContent, Box, Container, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const cardData = [
  {
    title: "Vas vármegye",
    description: "Kattints a részletekhez!",
    icon: <FlagIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />, 
    extraCards: [
      {
        title: "Szombathely",
        description: "A város nevezetességei.",
        icon: <LocationCityIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />,
        extraCards: [
          { title: "Savaria Plaza", description: "Bevásárlóközpont.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
          { title: "Family Center", description: "Kereskedelmi központ.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
        ],
      },
      {
        title: "Sárvár",
        description: "A város nevezetességei.",
        icon: <LocationCityIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />,
        extraCards: [
          { title: "Sárvári Gyógyfürdő", description: "Híres fürdőhely.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
          { title: "Nádasdy-vár", description: "Történelmi épület.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
        ],
      },
    ],
  },
  {
    title: "Zala vármegye",
    description: "Kattints a részletekhez!",
    icon: <FlagIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />, 
    extraCards: [
      {
        title: "Zalaegerszeg",
        description: "A város nevezetességei.",
        icon: <LocationCityIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />,
        extraCards: [
          { title: "Zala Plaza", description: "Bevásárlóközpont.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
          { title: "Zalakerámia Sportcsarnok", description: "Sportlétesítmény.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
        ],
      },
      {
        title: "Keszthely",
        description: "A város nevezetességei.",
        icon: <LocationCityIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />,
        extraCards: [
          { title: "Festetics-kastély", description: "Történelmi helyszín.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
          { title: "Balaton Plaza", description: "Bevásárlóközpont.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
        ],
      },
    ],
  },
  {
    title: "Győr-Moson-Sopron vármegye",
    description: "Kattints a részletekhez!",
    icon: <FlagIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />, 
    extraCards: [
      {
        title: "Győr",
        description: "A város nevezetességei.",
        icon: <LocationCityIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />,
        extraCards: [
          { title: "Árkád Győr", description: "Bevásárlóközpont.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
          { title: "Győri Bazilika", description: "Történelmi helyszín.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
        ],
      },
      {
        title: "Sopron",
        description: "A város nevezetességei.",
        icon: <LocationCityIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} />,
        extraCards: [
          { title: "Fő tér", description: "Központi hely.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
          { title: "Lővérek", description: "Természeti látványosság.", icon: <ShoppingCartIcon style={{ width: "30px", height: "30px", color: "#1c2331" }} /> },
        ],
      },
    ],
  },
];

const Materialuiinform = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCard = (path: string) => {
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleSearch = () => {
    console.log("Keresés:", searchQuery);
  };

  const renderCards = (cards: any[], parentPath: string = "", isChild: boolean = false) => (
    <Grid
      container
      spacing={3}
      sx={{
        justifyContent: isChild ? "flex-start" : "center",
        alignItems: "stretch",
      }}
    >
      {cards.map((card, index) => {
        const currentPath = `${parentPath}-${index}`;
        const isExpanded = expanded[currentPath] || false;

        return (
          <Grid
            item
            key={currentPath}
            xs={12}
            sm={isChild ? 12 : 6}
            md={isChild ? 12 : 4}
            lg={isChild ? 12 : 4}
          >
            <Card
              sx={{
                width: "100%",
                borderRadius: "16px",
                boxShadow: 3,
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#161C27",
                color: "#ffffff",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
                },
              }}
              onClick={() => toggleCard(currentPath)}
            >
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  margin: "0 auto 16px",
                  backgroundColor: "#DAFFC4",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: "#ffffff" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ffffff" }}>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
            {isExpanded && card.extraCards?.length > 0 && (
              <Box mt={2}>{renderCards(card.extraCards, currentPath, true)}</Box>
            )}
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Container
      sx={{
        backgroundColor: "#1c2331",
        margin: "30px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >

      

      <Typography
        variant="h6"
        sx={{
          color: "#ffffff",
          marginBottom: "50px",
        }}
      >
        Vizuális Gyorskeresés
      </Typography>


      <Box sx={{ width: "100%" }}>
        {renderCards(cardData)}
      </Box>
    </Container>
  );
};

export default Materialuiinform;
