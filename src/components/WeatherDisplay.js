// WeatherDisplay.js
import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weather, lastFiveDaysData }) => {
  const { name, main, weather: weatherDetails, wind } = weather;
  const { temp, humidity } = main;
  const { description, icon } = weatherDetails[0];
  const { speed } = wind;

  // Function to get background color based on weather description
  const getBackgroundColor = (description) => {
    switch (description) {
      case 'clear sky':
        return '#87CEEB'; // Light blue for clear sky
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return '#B0C4DE'; // Light grey for cloudy weather
      case 'shower rain':
      case 'rain':
        return '#4682B4'; // Dark blue for rain
      case 'thunderstorm':
        return '#556B2F'; // Olive green for thunderstorm
      case 'snow':
        return '#F0FFFF'; // Azure for snow
      default:
        return '#FFF8DC'; // Cornsilk for other conditions
    }
  };

  const backgroundStyle = {
    backgroundColor: getBackgroundColor(description),
  };

  return (
    <div className="weather-display" style={backgroundStyle}>
      <h2>{name}</h2>
      <div className="weather-info">
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
          className="weather-icon"
        />
        <p className="temperature">{`${temp.toFixed(1)}°C`}</p>
        <p className="description">{description}</p>
        <div className="additional-info">
          <p>{`Humidity: ${humidity}%`}</p>
          <p>{`Wind Speed: ${speed} km/h`}</p>
        </div>
      </div>
      <div className="last-five-days">
        <h3>Last 5 Days Weather</h3>
        <ul>
          {lastFiveDaysData.map(day => (
            <li key={day.date}>
              <p>Date: {day.date}</p>
              <p>Temperature: {day.temp.toFixed(1)}°C</p>
              <p>Description: {day.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDisplay;
