'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './ClinicMap.module.css';

const CLINIC_POSITION: [number, number] = [53.3783691, -2.3487791];
const CLINIC_NAME = 'Lamea Dental';
const CLINIC_ADDRESS = 'The Green Garage, 126 Ashley Rd, Hale, Altrincham WA14 2UN, UK';

const clinicIcon = L.icon({
  iconUrl: '/location.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'clinic-map-marker',
});

export default function ClinicMap() {
  return (
    <div className={styles.map}>
      <MapContainer
        center={CLINIC_POSITION}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={CLINIC_POSITION} icon={clinicIcon}>
          <Popup>
            <div className={styles.popup}>
              <strong className={styles.popupName}>{CLINIC_NAME}</strong>
              <p className={styles.popupAddress}>{CLINIC_ADDRESS}</p>
              <a
                href="https://maps.app.goo.gl/grKckPhKP9KzxPRKA"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.popupLink}
              >
                Get Directions →
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
