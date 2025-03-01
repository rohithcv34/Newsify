import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-white-100 p-4 rounded-lg shadow-lg">
      <h3 className="font-semibold text-xl">Weather</h3>
      <div className="flex items-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="weather"
          className="w-16 h-16"
        />
        <div className="ml-4">
          <p>{weather.name}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
