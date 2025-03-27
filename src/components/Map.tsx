"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '@/styles/Map.module.css';

const Map = () => {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });
  }, []);

  const defaultCenter: [number, number] = [47.1625, 19.5033];
  const defaultZoom = 7;

  return (
    <div className={styles.mapContainer}>
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
        <Marker position={[47.4979, 19.0402]}>
          <Popup>
            Budapest
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;