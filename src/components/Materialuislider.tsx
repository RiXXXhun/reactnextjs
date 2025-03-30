"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../components/swiper-custom.css';
import { Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { Container, Box, Typography, TextField, IconButton, InputAdornment, Card, CardContent, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AppsIcon from '@mui/icons-material/Apps';
import DiscountIcon from '@mui/icons-material/Discount';
import BusinessIcon from '@mui/icons-material/Business';

interface CardData {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const cardData: CardData[] = [
  {
    title: '24/7 Ügyfélszolgálat',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. 2000 AC YEAR',
    icon: <SupportAgentIcon style={{ width: '30px', height: '30px', color: "black" }} />,
  },
  {
    title: 'Lehetőségek',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <AppsIcon style={{ width: '30px', height: '30px', color: "black" }} />,
  },
  {
    title: 'Kedvezmények',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <DiscountIcon style={{ width: '30px', height: '30px', color: "black" }} />,
  },
  {
    title: 'Cégünk',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    icon: <BusinessIcon style={{ width: '30px', height: '30px',  color: "black"}} />,
  },
];

const MaterialSwiper: React.FC = () => {
  const theme = useTheme();

  return (
    <Container 
    sx={{ 
      backgroundColor: '#1c2331', 
      py: 5, 
      minHeight: '58vh', 
      padding: 0, 
      marginTop: '60px', 
      pl: 5, 
      pr: 5, 
      maxWidth: '1400px', 
      width: '100%' 
      }}
    >
      <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mb: 4, 
        backgroundColor: '#1c2331', 
        pt: '100px', 
        pl: 4, 
        pr: 5 
        }}
      >
        <Typography variant="h5" sx={{ color: 'white', mb: 5 }}>
          GYORSKERESÉS
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Gyorskeresés..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </InputAdornment>
            ),
            style: {
              color: 'white',
              backgroundColor: '#1c2331',
              borderRadius: '25px',
              border: '2px solid white',
            },
          }}
          sx={{
            width: { xs: 'calc(100% - 80px)', sm: 'calc(100% - 80px)', md: '60%', lg: '40%' },
            mx: { xs: '0', sm: '0', md: 0, lg: 0 },
          }}
        />
      </Box>

      <Box sx={{ height: '50px' }} />

      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="margin-top: 20px;"></span>`;
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        keyboard={true}
        loop={true}
        modules={[Pagination, Autoplay, Keyboard]}
        style={{
          backgroundColor: '#1c2331',
          width: 'calc(100% - 50px)',
          padding: 30,
          margin: '0 auto',
        }}
        slidesPerView={3}
        breakpoints={{
          [theme.breakpoints.values.xs]: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          [theme.breakpoints.values.sm]: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          [theme.breakpoints.values.md]: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          [theme.breakpoints.values.lg]: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          [theme.breakpoints.values.xl]: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: 3,
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#161C27',
                color: 'white',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
                },
              }}
            >
              <Box
                sx={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 16px',
                  backgroundColor: 'lightgreen',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {card.icon}
              </Box>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2">{card.description}</Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default MaterialSwiper;
