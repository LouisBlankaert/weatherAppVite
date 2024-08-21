import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAHfASf9BN76fm0pvBEnw_Ga-n2MMc52HQ'; // Remplacez par votre clé API Google Maps

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
