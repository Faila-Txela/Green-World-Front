import React, { useEffect } from 'react';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

const locationsData = [
  { name: "Viana", meses: "Março", relatos: 65, lat: -8.864, lon: 13.56 },
  { name: "Alvalade", meses: "Abril", relatos: 30, lat: -8.852, lon: 13.259 },
  { name: "Cazenga", meses: "Fevereiro", relatos: 10, lat: -8.841, lon: 13.258 },
  { name: "Ingombota", meses: "Janeiro", relatos: 90, lat: -8.831, lon: 13.235 },
  { name: "Samba", meses: "Março", relatos: 50, lat: -8.885, lon: 13.270 },
];

const MapComponent = () => {
  useEffect(() => {
    const features = locationsData.map(location => {
      const feature = new Feature({
        geometry: new Point([location.lon, location.lat]),
        name: location.name,
        relatos: location.relatos,
        meses: location.meses
      });

      feature.setStyle(new Style({
        image: new Icon({
          scale: 0.1,
        }),
      }));

      return feature;
    });

    const vectorSource = new VectorSource({ features });

    const vectorLayer = new VectorLayer({ source: vectorSource });

    const rasterLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?apiKey=apiKey=eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfaWI5dHY0eXkiLCJqdGkiOiIyZjBlZjIzNiJ9.xUM68ikF9MBHfhxuJb0gNI_RMwFk1vbDCrbWKv00Tlo',
      }),
    });

    const map = new Map({
      target: 'map',
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: [13.2571, -8.83833],
        zoom: 10,
        projection: 'EPSG:4326',
      }),
    });

    return () => map.setTarget();
  }, []);

  return <div id="map" className="w-full h-[400px]"/>;

};

export default MapComponent;
