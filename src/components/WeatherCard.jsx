 import React from 'react';

const WeatherCard = ({ title, temp, icon, description }) => (
  <div className="weather-card">
    <h3>{title}</h3>
    <img src={icon} alt={description} className="icon" />
    <p>{temp}°C</p>
    <span>{description}</span>
  </div>
);

export default WeatherCard;
