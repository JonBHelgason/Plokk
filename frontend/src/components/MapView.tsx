import { MapContainer, TileLayer, Rectangle, Popup } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import type { Area } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  areas: Area[];
}

const getAreaColor = (status: string): string => {
  switch (status) {
    case 'clean':
      return 'green';
    case 'moderate':
      return 'yellow';
    case 'dirty':
      return 'red';
    default:
      return 'gray';
  }
};

export function MapView({ areas }: MapViewProps) {
  const center: [number, number] = [64.145, -21.93];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {areas.map((area) => {
        const bounds = new LatLngBounds(
          [area.bounds.south, area.bounds.west],
          [area.bounds.north, area.bounds.east]
        );
        return (
          <Rectangle
            key={area.id}
            bounds={bounds}
            pathOptions={{
              color: getAreaColor(area.status),
              fillColor: getAreaColor(area.status),
              fillOpacity: 0.5,
            }}
          >
            <Popup>
              <div>
                <h3>{area.name}</h3>
                <p>Status: {area.status}</p>
                {area.lastCleaned && (
                  <p>Last cleaned: {new Date(area.lastCleaned).toLocaleDateString()}</p>
                )}
                {area.cleanedBy && <p>Cleaned by: {area.cleanedBy}</p>}
              </div>
            </Popup>
          </Rectangle>
        );
      })}
    </MapContainer>
  );
}
