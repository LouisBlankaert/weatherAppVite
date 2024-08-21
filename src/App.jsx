import { useState, useEffect } from "react";
import { FaSpinner } from 'react-icons/fa';
import WeatherData from "./components/WeatherData";
import Map from "./components/Map"; // Import du composant Map

export default function App() {
  const [city, setCity] = useState('Bruxelles');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const handleSearch = () => {
    if (city.trim() === '') {
      return;
    }

    setLoading(true);
    setTriggerSearch(true);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError(null); // Réinitialiser l'erreur lors de la saisie
  };

  useEffect(() => {
    handleSearch(); // Appel de la recherche au montage pour afficher Bruxelles
  }, []);

  useEffect(() => {
     document.title = `Météo | ${weatherData?.location.name ?? ''}`
  }, [weatherData]);



  useEffect(() => {
    if (!triggerSearch) return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Aucune ville ne correspond');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setCoordinates({
          lat: data.location.lat,
          lng: data.location.lon
        });
        setLoading(false);
        setTriggerSearch(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        setTriggerSearch(false);
      });
  }, [triggerSearch, city]);

  useEffect(() => {
    // Réinitialiser la barre de recherche après affichage des données météorologiques pour Bruxelles
    if (weatherData) {
      setCity('');
    }
  }, [weatherData]);
  

  return (
    <div className="bg-gradient-to-r from-orange-300 via-yellow-400 to-orange-400 h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex justify-between w-full px-4">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Rechercher une ville..."
            className="p-2 rounded w-3/4"
          />
          <button onClick={handleSearch} className="p-2 ml-2 bg-blue-500 text-white rounded">
            Search
          </button>
        </div>
        {loading && <FaSpinner className="loading-icon animate-spin text-white text-2xl" />}
        {error && <div className="text-red-500">{error}</div>}
        {weatherData && (
          <>
            <WeatherData weatherData={weatherData} />
            <Map coordinates={coordinates} />
          </>
        )}
      </div>
    </div>
  );
}
