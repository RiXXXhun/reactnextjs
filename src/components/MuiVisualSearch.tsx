'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const cities = [
  { name: 'Szombathely', plaza: 'Savaria Plaza' },
  { name: 'Sárvár', plaza: 'Sárvár Shopping Center' },
  { name: 'Körmend', plaza: 'Körmend Retail Park' },
  { name: 'Celldömölk', plaza: 'Celldömölk Plaza' },
  { name: 'Vasvár', plaza: 'Vasvár Mall' },
  { name: 'Őriszentpéter', plaza: 'Őriszentpéter Trade Center' },
];

export default function CitySlider() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: '#161C27', p: 3 }}>
      <Typography variant="h4" sx={{ color: '#DAFFC4', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>Vas vármegye</Typography>
      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        grabCursor={true}
        spaceBetween={30}
        height={300}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ maxWidth: '1200px', position: 'relative', background: 'transparent', boxShadow: 'none', border: 'none' }}
      >
        {cities.map((city, index) => (
          <SwiperSlide key={index}>
            <Card sx={{ textAlign: 'center', borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', p: 3, backdropFilter: 'blur(20px)', border: 'none', transition: 'box-shadow 0.3s ease-in-out', '&:hover': { boxShadow: '0 0 15px rgba(30,144,255,0.8)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <LocationCityIcon sx={{ fontSize: 40, color: '#DAFFC4' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#DAFFC4' }}>{city.name}</Typography>
                <Typography variant="body1" sx={{ color: '#e3e3e3', mb: 2 }}>{city.plaza}</Typography>
                <Button variant="contained" sx={{ background: '#DAFFC4', color: '#161C27', ':hover': { background: 'rgba(218,255,196,0.8)', color: '#161C27' } }}>Továbbiak</Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next" style={{ color: 'white' }}></div>
        <div className="swiper-button-prev" style={{ color: 'white' }}></div>
      </Swiper>
    </Box>
  );
}
