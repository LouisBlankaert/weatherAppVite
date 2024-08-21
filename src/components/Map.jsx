import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Remplacez par votre clé API Google Maps

console.log('Google Maps API Key:', GOOGLE_MAPS_API_KEY);

export default function Map({ coordinates }) {
  return (
    <div className="w-full h-96 mt-4">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={coordinates}
          zoom={10}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
