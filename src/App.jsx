import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Footer from './components/Footer';
import './App.css';

const API_KEY = "8a79428cb4a14821af61e90629da1ced";

const App = () => {
  const [city, setCity] = useState("Delhi");
  const [query, setQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [weatherType, setWeatherType] = useState("");

  const fetchWeather = async (input) => {
    try {
      let currentRes, forecastRes;

      if (typeof input === "string") {
        currentRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`);
        forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${API_KEY}&units=metric`);
      } else {
        const { lat, lon } = input;
        currentRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      }

      setCurrentWeather(currentRes.data);
      setCity(currentRes.data.name);
      setWeatherType(currentRes.data.weather[0].main);

      const filtered = forecastRes.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(filtered.slice(0, 5));
    } catch (err) {
      alert("City not found or access denied");
      console.error(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => fetchWeather("Delhi")
    );
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
      setQuery("");
    }
  };

  return (
    <div className={`app ${isLightTheme ? "light" : ""} ${weatherType.toLowerCase()}`}>
      <div className="name-banner">
        <div className="left-name">Shivam</div>
        <div className="right-name">Jugsana</div>
      </div>

      <header>
        <h1>{city.toUpperCase()}</h1>
        {currentWeather && (
          <p>
            {new Date().toLocaleDateString()} | {currentWeather.main.temp}°C | {currentWeather.weather[0].description}
          </p>
        )}

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search any city weather..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <button className="theme-toggle" onClick={() => setIsLightTheme(!isLightTheme)}>
          {isLightTheme ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <div className="weather-section">
        {currentWeather && (
          <WeatherCard
            title="Now"
            temp={currentWeather.main.temp}
            icon={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            description={currentWeather.weather[0].main}
          />
        )}
      </div>

      <h2>5-Day Forecast</h2>
      <div className="forecast-section">
        {forecast.map((day, index) => (
          <ForecastCard
            key={index}
            date={day.dt_txt.split(" ")[0]}
            temp={day.main.temp}
            icon={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            description={day.weather[0].main}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default App;
