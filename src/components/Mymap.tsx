"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '@/styles/Map.module.css';
import { Box, Container, Typography, Button } from '@mui/material';
import { getLeafletMaps, getPlazas, getCities } from '../services/api'; 

const MyMap = () => {
  const [leafletMaps, setLeafletMaps] = useState<any[]>([]);
  const [plazas, setPlazas] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]); 
  const router = useRouter();

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });

    const fetchLeafletMaps = async () => {
      try {
        const response = await getLeafletMaps(); 
        setLeafletMaps(response);
      } catch (error) {
        console.error("Error fetching leaflet maps:", error);
      }
    };

    const fetchPlazas = async () => {
      try {
        const response = await getPlazas(); 
        setPlazas(response);
      } catch (error) {
        console.error("Error fetching plazas:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await getCities(); 
        setCities(response);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchLeafletMaps();
    fetchPlazas();
    fetchCities();
  }, []);

  const defaultCenter: [number, number] = [47.1625, 19.5033];
  const defaultZoom = 7;

  const handleNavigate = (plazaId: string) => {
    router.push(`/plazas/${plazaId}`); 
  };

  return (
    <Box sx={{ backgroundColor: "#1c2331", width: "100%", zIndex: 500 }} id="map" >
      <Container 
        maxWidth="lg"
        sx={{ 
          py: 4,
          px: 2,
          zIndex: 500,
        }}
      >
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          mb: 4,
          zIndex: 500,
        }}>
          <Typography variant="h5" sx={{ color: "white", mb: 3, zIndex: 500 }}>
            TÉRKÉPES KERESÉS
          </Typography>
        </Box>

        <Box
          sx={{
            border: "10px solid #161C27",
            borderRadius: "25px",
            overflow: "hidden",
            position: "relative",
            height: "800px",
            width: "100%",
            zIndex: 500,
            '& .leaflet-container': {
              height: '100% !important',
              width: '100% !important',
              zIndex: 500,
            }
          }}
        >
          <MapContainer
            key={defaultCenter.toString()}
            center={defaultCenter}
            zoom={defaultZoom}
            className={styles.leafletContainer}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {leafletMaps.map((map) => {
              const plaza = plazas.find((p) => p.leafletMapId === map.id);
              const city = cities.find((c) => c.id === plaza?.cityId); 

              if (map.latitude && map.longitude && plaza && city) {
                return (
                  <Marker 
                    key={map.id} 
                    position={[map.latitude, map.longitude]}
                  >
                    <Popup>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ color: '#000' }}>
                          {city.name} - {map.plazaMapName}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#000' }}>
                          A Továbbiakhoz kattintson a TOVÁBB gombra!
                        </Typography>
                        <Button 
                          onClick={() => handleNavigate(plaza.id)} 
                          sx={{ mt: 2 }}
                          variant="contained" 
                          color="primary"
                        >
                          Tovább
                        </Button>
                      </Box>
                    </Popup>
                  </Marker>
                );
              }

              return null; 
            })}
          </MapContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default MyMap;
