import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet'; // Importando o Leaflet para personalizar os ícones

// Dados das localizações com mais informações para estados de lixo
const locationsData = [
  { name: "Viana", meses: "Março", relatos: 65, lat: -8.864, lon: 13.56, estado: 'alto' },
  { name: "Alvalade", meses: "Abril", relatos: 30, lat: -8.852, lon: 13.259, estado: 'médio' },
  { name: "Cazenga", meses: "Fevereiro", relatos: 10, lat: -8.841, lon: 13.258, estado: 'baixo' },
  { name: "Ingombota", meses: "Janeiro", relatos: 90, lat: -8.831, lon: 13.235, estado: 'alto' },
  { name: "Samba", meses: "Março", relatos: 50, lat: -8.885, lon: 13.270, estado: 'médio' },
];

// Função para definir os ícones com base no estado da região
const getMarkerIcon = (estado: string) => {
  switch (estado) {
    case 'alto':
      return new L.Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Red_circle.svg',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
      });
    case 'médio':
      return new L.Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Red_circle.svg',
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
      });
    case 'baixo':
      return new L.Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Red_circle.svg',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
      });
    default:
      return new L.Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Red_circle.svg',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
      });
  }
};

const Map = () => {
  return (
    <div className="w-full md:w-[50rem] h-80 mb-16 mt-14 relative z-10">
      <MapContainer center={[-8.83833, 13.2571]} zoom={13} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
        />
        {locationsData.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lon]}
            icon={getMarkerIcon(location.estado)} 
          >
            <Popup>
              <strong>{location.name}</strong>
              <p>Relatos: {location.relatos}</p>
              <p>Meses com mais relatos: {location.meses}</p>
              <p>Estado da região: {location.estado === 'alto' ? 'Alto' : location.estado === 'médio' ? 'Médio' : 'Baixo'}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
