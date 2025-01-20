import React, { useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Dummy data
const data = {
  Vármegyék: [
    {
      név: "Győr-Moson-Sopron",
      városok: [
        {
          név: "Győr",
          bevásárlóközpontok: ["Árkád Győr", "ETO Park Shopping Center"],
        },
        {
          név: "Sopron",
          bevásárlóközpontok: ["Sopron Plaza", "Alpha Park"],
        },
      ],
    },
    {
      név: "Vas",
      városok: [
        {
          név: "Szombathely",
          bevásárlóközpontok: ["Savaria Plaza", "Fő tér Üzletház"],
        },
        {
          név: "Sárvár",
          bevásárlóközpontok: ["Sárvár Plaza"],
        },
      ],
    },
    {
      név: "Zala",
      városok: [
        {
          név: "Zalaegerszeg",
          bevásárlóközpontok: ["Zala Plaza"],
        },
        {
          név: "Nagykanizsa",
          bevásárlóközpontok: ["Kanizsa Centrum"],
        },
      ],
    },
  ],
};

const HierarchicalNavigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMegye, setExpandedMegye] = useState<string | null>(null);
  const [expandedVaros, setExpandedVaros] = useState<string | null>(null);

  const handleSearch = () => {
    setSearchTerm(searchTerm);
  };

  const filteredVármegyék = data.Vármegyék.filter((megye) =>
    megye.név.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMegyeClick = (megye: string) => {
    setExpandedMegye(expandedMegye === megye ? null : megye);
  };

  const handleVarosClick = (varos: string) => {
    setExpandedVaros(expandedVaros === varos ? null : varos);
  };
  

  return (
    <Box p={2} display="flex" flexDirection="column" gap={4}>
      
      <Box display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Gyorskeresés..."
          sx={{
            width: {
              xs: "90%",
              sm: "70%",
              md: "50%",
            },
            marginTop: "50px",
          }}
          InputProps={{
            endAdornment: (
              <IconButton sx={{ color: "white" }} onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            ),
          }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2} 
      >
        {filteredVármegyék.map((megye) => (
          <Card
            sx={{
              maxWidth: 345,
              margin: "10px", 
            }}
            key={megye.név}
          >
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "#f44336" }} aria-label="recipe">R</Avatar>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={megye.név}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                A vármegye tartalma...
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                onClick={() => handleMegyeClick(megye.név)}
                variant="outlined"
                size="small"
              >
                Továbbiak
              </Button>
            </CardActions>

            <Collapse in={expandedMegye === megye.név} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Városok:</Typography>
                {megye.városok.map((város) => (
                  <Box key={város.név} sx={{ marginBottom: 2 }}>
                    <Button
                      onClick={() => handleVarosClick(város.név)}
                      variant="outlined"
                      size="small"
                    >
                      {város.név}
                    </Button>

                    <Collapse in={expandedVaros === város.név} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography sx={{ marginBottom: 2 }}>Plázák/Besárlóközpontok:</Typography>
                        {város.bevásárlóközpontok.map((központ) => (
                          <Typography key={központ} sx={{ marginBottom: 1 }}>
                            {központ}
                          </Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Box>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HierarchicalNavigation;
