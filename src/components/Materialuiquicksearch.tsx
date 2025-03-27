import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'; 
import React, { useState, useRef, useEffect } from "react";
import { Typography, Box, TextField, InputAdornment, IconButton, List, ListItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getPlazas, getCities, getCounties } from '../services/api';

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

const QuickSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [plazas, setPlazas] = useState<Plaza[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [counties, setCounties] = useState<County[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Plaza[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPlazasCitiesAndCounties = async () => {
      try {
        const [plazaData, cityData, countyData] = await Promise.all([getPlazas(), getCities(), getCounties()]);
        setPlazas(plazaData);
        setCities(cityData);
        setCounties(countyData);
        setFilteredSuggestions(plazaData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchPlazasCitiesAndCounties();
  }, []);

  const getCityNameById = (cityId: string) => {
    const city = cities.find(city => city.id === cityId);
    return city ? city.name : '';
  };

  const getCountyNameById = (countyId: string) => {
    const county = counties.find(county => county.id === countyId);
    return county ? county.name : '';
  };

  const handleSearch = () => {
    if (filteredSuggestions.length > 0) {
      window.location.href = `/plazas/${filteredSuggestions[0].id}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setFilteredSuggestions(plazas.filter(plaza => 
        plaza.plazaName.toLowerCase().includes(query.toLowerCase()) ||
        getCityNameById(plaza.cityId).toLowerCase().includes(query.toLowerCase()) ||
        getCountyNameById(plaza.countyId).toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(plazas);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (plaza: Plaza) => {
    setSearchQuery(`${getCountyNameById(plaza.countyId)} ${getCityNameById(plaza.cityId)} ${plaza.plazaName}`);
    setShowSuggestions(false);
    window.location.href = `/plazas/${plaza.id}`;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        padding: "50px 0", 
        textAlign: "center", 
      }}
      id="quick-search"
    >
      <Typography
        variant="h6"
        sx={{
          color: "#ffffff",
          marginBottom: "50px",
        }}
      >
        Gyorskeresés
      </Typography>

      <Box
        ref={searchRef}
        sx={{
          width: {
            xs: "90%",
            sm: "70%",
            md: "50%",
          },
          margin: "0 auto",
          marginBottom: "50px",
          position: "relative",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Gyorskeresés..."
          value={searchQuery}
          onClick={() => setShowSuggestions(true)}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "white" }}
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: "25px",
              border: "2px solid white",
              color: "white",
              backgroundColor: "#1c2331",
            },
          }}
        />

        {showSuggestions && (
          <Paper
            sx={{
              position: "absolute",
              zIndex: 1,
              top: "calc(100% + 10px)",
              width: "100%",
              maxHeight: "135px", 
              overflowY: "auto",
              backgroundColor: "#161C27"
            }}
          >
            <List
              sx={{
                '::-webkit-scrollbar': { width: '8px' },
                '::-webkit-scrollbar-thumb': { background: '#888' },
                '::-webkit-scrollbar-thumb:hover': { background: '#555' }
              }}
            >
              {filteredSuggestions.map((plaza, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    color: "#ffffff", 
                    backgroundColor: "#161C27", 
                    cursor: "pointer", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between" 
                  }} 
                  onClick={() => handleSuggestionClick(plaza)}
                >
                  {`${getCountyNameById(plaza.countyId)} ${getCityNameById(plaza.cityId)} ${plaza.plazaName}`}
                  <ArrowRightAltIcon />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default QuickSearch;