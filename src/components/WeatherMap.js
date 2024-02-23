// WeatherMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ onMapClick }) => {
  const handleClick = (event) => {
    const { lat, lng } = event.latlng;
    onMapClick({ lat, lon: lng });
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler handleClick={handleClick} />
    </MapContainer>
  );
};

const ClickHandler = ({ handleClick }) => {
  useMapEvents({
    click: (event) => handleClick(event),
  });
  return null;
};

export default WeatherMap;
