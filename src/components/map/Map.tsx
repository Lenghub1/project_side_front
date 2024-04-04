import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import { useIsMobile } from "@/utils/isMobile";
const MapComponent = () => {
  const isMobile = useIsMobile();
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
        height: isMobile ? 200 : 350,
        borderRadius: 16,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker latitude={11.59669} longitude={104.92578} />
    </Map>
  );
};
export default MapComponent;
