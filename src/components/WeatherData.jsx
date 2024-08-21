export default function WeatherData({ weatherData }) {
    return (
      <div className="text-white flex flex-col items-center">
        <h1 className="uppercase text-3xl text-red-500">{weatherData.location.name}</h1>
        <p className="text-2xl">{weatherData.location.country}</p>
        <div className="text-black bg-white border rounded-md p-5 flex items-center justify-between mt-2 w-full max-w-md">
          <div>
            <p className="text-2xl">Température : {weatherData.current.temp_c}°C</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="ml-4">
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
          </div>
        </div>
      </div>
    );
  }
  