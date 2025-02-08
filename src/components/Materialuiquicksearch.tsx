import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'; 
import React, { useState, useRef, useEffect } from "react";
import { Typography, Box, TextField, InputAdornment, IconButton, List, ListItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const QuickSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions] = useState<string[]>([
    "Vas Megyei Plaza 1",
    "Vas Megyei Plaza 2",
    "Zala Megyei Plaza 1",
    "Zala Megyei Plaza 2",
    "Győr-Moson-Sopron Megyei Plaza 1",
    "Győr-Moson-Sopron Megyei Plaza 2"
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(suggestions);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    window.location.href = "https://hu.wikipedia.org/wiki/Vas_v%C3%A1rmegye";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setFilteredSuggestions(suggestions.filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase())).slice(0, 6));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(suggestions);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
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
              {filteredSuggestions.map((suggestion, index) => (
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
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
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
