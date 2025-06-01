import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoidG9nZWJpc3UiLCJhIjoiY205cHE3MW43MWZleDJsczcxcXRwanBlNyJ9.3bkps3vPGr21guFbpgXX3Q';

const TestMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [120.9842, 14.5995],
      zoom: 11
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default TestMap; 