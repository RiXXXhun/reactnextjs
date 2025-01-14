"use client"

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Container, Box } from '@mui/material';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';

export default function App() {
  return (
    <Container sx={{ bgcolor: 'black', py: 5 }}>
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