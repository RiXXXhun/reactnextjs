import React from "react";
import { CardMedia, Typography, Box, IconButton } from "@mui/material";
import { YouTube, GitHub, Facebook } from "@mui/icons-material";

const teamMembers = [
  {
    name: "Hustikker Szabolcs",
    role: "Szoftverfejlesztő (Back-end, Frond-end), Grafikus designer, Dokumentációs szakértő",  
    img: "/Hustikker Szabolcs.jpg",  
  },
  {
    name: "Nagy-Eperjesi Richárd János",
    role: "Szoftverfejlesztő (Back-end, Frond-end), UX/UI tervező, PPT, Ikon tervezés, .md/útmutató",  
    img: "/Nagy-Eperjesi Richárd János.jpg",  
  },
  {
    name: "Tóth Zoltán",
    role: "Szoftverfejlesztő (Back-end, Frond-end), Fő ötletgazda, Timeline, PPT, Fő Szoftvertesztelő",  
    img: "/Tóth Zoltán.jpg", 
  },
];

const TeamSection: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center", p: 4, background: "#1c2331" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textTransform: "uppercase",
          fontWeight: 500,
          color: "white",
          pb: 10,
        }}
      >
        Csapatunk emberei
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
        {teamMembers.map((member, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: 300,
              height: 400,
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: 3,
              background: "#161C27",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
              },
              "&:hover .content": {
                bottom: 0,
              },
            }}
          >
            <CardMedia
              component="img"
              height="400"
              image={member.img}
              alt={member.name}
            />
            <Box
              className="content"
              sx={{
                position: "absolute",
                bottom: "-100%",
                width: "100%",
                background: "rgba(30, 144, 255, 0.8)",
                color: "white",
                textAlign: "center",
                borderRadius: "0 0 15px 15px",
                transition: "bottom 0.5s ease-in-out",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {member.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {member.role}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <IconButton
                  color="inherit"
                  sx={{
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
                    },
                  }}
                >
                  <YouTube />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  color="inherit"
                  sx={{
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
                    },
                  }}
                >
                  <Facebook />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TeamSection;
