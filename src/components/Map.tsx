import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { relatarService } from '../modules/service/api/relatar';

// Dados estáticos como fallback
const staticLocations = [
  { name: "Viana", relatos: 65, lat: -8.864, lon: 13.56 },
  { name: "Alvalade", relatos: 30, lat: -8.852, lon: 13.259 },
  { name: "Cazenga", relatos: 10, lat: -8.841, lon: 13.258 },
  { name: "Ingombota", relatos: 90, lat: -8.831, lon: 13.235 },
  { name: "Samba", relatos: 50, lat: -8.885, lon: 13.270 },
];

// Ícones por quantidade de relatos
const getMarkerIcon = (relatos: number) => {
  let iconUrl = '';

  if (relatos > 70) {
    iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
  } else if (relatos > 30) {
    iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
  } else {
    iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
  }

  return new L.Icon({
    iconUrl,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const MapComponent = () => {
  const [locations, setLocations] = useState(staticLocations);

  useEffect(() => {
    const fetchAmontoados = async () => {
      try {
        const response = await relatarService.getAll();
        const data = response.data;

        // Agrupar por município
        const grouped = new Map<string, { name: string; relatos: number; lat: number; lon: number }>();

        for (const item of data) {
          const municipio = item.municipio?.nome || 'Desconhecido';
          if (!grouped.has(municipio)) {
            grouped.set(municipio, {
              name: municipio,
              relatos: 1,
              lat: parseFloat(item.latitude),
              lon: parseFloat(item.longitude),
            });
          } else {
            const current = grouped.get(municipio)!;
            current.relatos += 1;
            grouped.set(municipio, current);
          }
        }

        setLocations(Array.from(grouped.values()));
      } catch (error) {
        console.error("Erro ao carregar dados dinâmicos, usando estáticos", error);
      }
    };

    fetchAmontoados();
  }, []);

  return (
    <MapContainer center={[-8.83833, 13.2571]} zoom={12} className='z-10' style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, idx) => (
        <Marker
          key={idx}
          position={[location.lat, location.lon]}
          icon={getMarkerIcon(location.relatos)}
        >
          <Popup>
            <strong>{location.name}</strong><br />
            Relatos: {location.relatos}<br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
