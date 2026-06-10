'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './ContactForm.module.css';

const businessIcon = L.divIcon({
  className: styles.markerIcon,
  html: `<img src="/marker.png?v=${Date.now()}" alt="Lamea Dental" />`,
  iconSize: [40, 53],
  iconAnchor: [20, 53],
  popupAnchor: [0, -48],
});

const CLINIC_POSITION: [number, number] = [53.3783691, -2.3487791];
const CLINIC_NAME = 'Lamea Dental';
const CLINIC_ADDRESS = 'The Green Garage, 126 Ashley Rd, Hale, Altrincham WA14 2UN, UK';

export default function ClinicMap() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={CLINIC_POSITION}
        zoom={17}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={CLINIC_POSITION} icon={businessIcon}>
          <Popup>
            <strong>{CLINIC_NAME}</strong>
            <br />
            {CLINIC_ADDRESS}
            <br />
            <a href="https://maps.app.goo.gl/KpbVTHi9SZzUc48M8" target="_blank" rel="noopener noreferrer" className={styles.directionsLink}>
              Get Directions →
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
