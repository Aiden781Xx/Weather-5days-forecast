 import React from 'react';

const ForecastCard = ({ date, temp, icon, description }) => (
  <div className="weather-card">
    <h3>{date}</h3>
    <img src={icon} alt={description} className="icon" />
    <p>{temp}°C</p>
    <span>{description}</span>
  </div>
);

export default ForecastCard;
