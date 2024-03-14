import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";

const MapComponent = () => {
  
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiY2xhc2gwMiIsImEiOiJjbHFiOHg2NHMwbjBtMmxwZnFibWxkeTNwIn0.RGHUtRxVTorY6mwCsjLEbg"
      initialViewState={{
        longitude: 104.92578,
        latitude: 11.59669,
        zoom: 14,
      }}
      style={{
        position: "relative",
        height: 400,
        borderRadius: 16,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};

export default MapComponent;
