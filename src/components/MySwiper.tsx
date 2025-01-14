"use client"

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Container, Box, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';
import SearchIcon from '@mui/icons-material/Search';

export default function App() {
  return (
    <Container sx={{ backgroundColor: '#1c2331', py: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
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
              border: '2px solid white', // Vastagabb körvonal
            },
          }}
          sx={{
            width: { xs: 'calc(100% - 80px)', sm: 'calc(100% - 80px)', md: '60%', lg: '40%' },
            mx: { xs: '40px', sm: '40px', md: 0, lg: 0 }, // Jobb és bal oldalon 40px margó xs és sm méretekben
          }}
        />
      </Box>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        keyboard={true}
        modules={[Pagination, Autoplay, Navigation, Keyboard]}
        className="mySwiper"
        style={{ backgroundColor: 'white' }}
      >
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 1
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 2
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 3
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 4
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 5
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 6
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 7
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 8
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black' }}>
            Slide 9
          </Box>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}
