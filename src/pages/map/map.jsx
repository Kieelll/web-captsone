import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import bbox from '@turf/bbox';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./map.scss";


const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [highlightLayer, setHighlightLayer] = useState(false);
  const [marikinaGeoJSON, setMarikinaGeoJSON] = useState(null);

  // Fetch GeoJSON once when component mounts
  useEffect(() => {
    fetch('/marikinaArea.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load GeoJSON');
        return response.json();
      })
      .then((data) => {
        setMarikinaGeoJSON(data);
      })
      .catch((error) => {
        console.error('Error loading GeoJSON:', error);
      });
  }, []);

  // Initialize map only after GeoJSON is loaded
  useEffect(() => {
    if (!mapContainer.current || !marikinaGeoJSON) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [120.9842, 14.5995],
      zoom: 11
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      map.current.addSource('marikina-area', {
        type: 'geojson',
        data: marikinaGeoJSON
      });

      map.current.addLayer({
        id: 'marikina-area-fill',
        type: 'fill',
        source: 'marikina-area',
        paint: {
          'fill-color': '#34D399',
          'fill-opacity': 0,
          'fill-outline-color': '#059669'
        }
      });

      map.current.addLayer({
        id: 'marikina-area-border',
        type: 'line',
        source: 'marikina-area',
        paint: {
          'line-color': '#059669',
          'line-width': 2,
          'line-opacity': 0
        }
      });
    });

    return () => map.current.remove();
  }, [marikinaGeoJSON]);

  const handleMyLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15
        });
      });
    }
  };

  const handleHighlightMarikina = () => {
    if (!marikinaGeoJSON) return;

    setHighlightLayer(!highlightLayer);

    if (!highlightLayer) {
      map.current.setPaintProperty('marikina-area-fill', 'fill-opacity', 0.1);
      map.current.setPaintProperty('marikina-area-border', 'line-opacity', 1);

      const bounds = bbox(marikinaGeoJSON);
      map.current.fitBounds(bounds, {
        padding: 50,
        duration: 1000
      });
    } else {
      map.current.setPaintProperty('marikina-area-fill', 'fill-opacity', 0);
      map.current.setPaintProperty('marikina-area-border', 'line-opacity', 0);
    }
  };

  const handleBenedictoLocation = () => {
    const benedictoLocation = [121.108354, 14.651333];

    const existingMarker = document.querySelector('.benedicto-marker');
    if (existingMarker) {
      existingMarker.remove();
    }

    new mapboxgl.Marker({ color: '#FF0000' })
      .setLngLat(benedictoLocation)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Benedicto Compound</h3><p>Concepcion Uno, Marikina City</p>'))
      .addTo(map.current);

    map.current.flyTo({
      center: benedictoLocation,
      zoom: 16
    });
  };

  return (
    <div className="map-page">
      <Sidebar />
      <div className="map-content-container">
        <Navbar />
        <div className="map-wrapper">
          <div ref={mapContainer} className="map-container" />
          <div className="map-controls">
            <button onClick={handleMyLocation} title="My Location">
              <MyLocationIcon />
            </button>
            <button onClick={handleHighlightMarikina} title="Highlight Marikina">
              <LocationCityIcon />
            </button>
            <button onClick={handleBenedictoLocation} title="Benedicto Compound">
              <HomeIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
