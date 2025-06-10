import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { relatarService } from '../modules/service/api/relatar';
import { LiaSpinnerSolid } from "react-icons/lia";
import { MdError } from "react-icons/md";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Para mostrar um erro, caso ocorra

  useEffect(() => {
    const fetchAmontoados = async () => {
      try {
        const response = await relatarService.getAll();
        const data = response.data;

        // Agrupar por município
        const grouped = new Map<string, { name: string; relatos: number; lat: number; lon: number }>();

        data.forEach((item: any) => {
          const municipio = item.municipio?.nome || 'Desconhecido'; // Garantir que o nome do município é acessado corretamente
          const lat = parseFloat(item.latitude);
          const lon = parseFloat(item.longitude);

          if (!grouped.has(municipio)) {
            grouped.set(municipio, {
              name: municipio,
              relatos: 1,
              lat,
              lon,
            });
          } else {
            const current = grouped.get(municipio)!;
            current.relatos += 1;
            grouped.set(municipio, current);
          }
        });

        setLocations(Array.from(grouped.values()));
        setLoading(false);  // Dados carregados, desativa o estado de carregamento
      } catch (error) {
        setError('Erro ao carregar dados dinâmicos. Por favor conecte-se a internet');
        setLoading(false);  // Se falhar, desativa o carregamento
      }
    };

    fetchAmontoados();
  }, []);

  // Se ainda estiver carregando ou se ocorreu um erro
  if (loading) {
    return <div className='flex gap-4'>
      <p>Carregando mapa...</p>
      <LiaSpinnerSolid size={28} className='animate-spin' />
      </div>;
  }

  if (error) {
    return <div className='flex gap-4 text-red-600'>
      {error}
      <MdError size={28} className='animate-pulse'/>
      </div>;
  }

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
