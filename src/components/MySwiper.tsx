"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Container, Box, TextField, IconButton, InputAdornment, Typography, Link } from '@mui/material';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';
import SearchIcon from '@mui/icons-material/Search';

export default function App() {
  return (


    <Container sx={{ backgroundColor: '#1c2331', py: 5, minHeight: '20vh', width: '100%', padding: 0, marginTop: '60px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, backgroundColor: '#1c2331' , pt: "100px"}}>
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
        style={{
          backgroundColor: '#1c2331',
          width: '100%',
          padding: 0,
          margin: 0,
        }}
        slidesPerView={1}
      >



        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 1
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 2
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 3
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 4
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 5
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 6
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 7
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 8
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: 'black', backgroundColor: '#1c2331', width: '100%' }}>
            Slide 9
          </Box>
        </SwiperSlide>
      </Swiper>


    </Container>



  );
}
