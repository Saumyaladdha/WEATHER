// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherForm from './components/WeatherForm';
import WeatherMap from './components/WeatherMap';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [lastFiveDaysData, setLastFiveDaysData] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async (query) => {
    // Fetch current weather data
    const apiKey = '331eba132b588e7047e52cff053141f4';
    let url;

    if (typeof query === 'string') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    } else {
      const { lat, lon } = query;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const fetchLastFiveDaysData = async (city) => {
    // Fetch weather data for the last 5 days
    const apiKey = '331eba132b588e7047e52cff053141f4';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const data = response.data.list.slice(0, 5).map(day => ({
        date: day.dt_txt,
        temp: day.main.temp,
        description: day.weather[0].description,
      }));
      setLastFiveDaysData(data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch last five days weather data:', error);
      setError('Failed to fetch last five days weather data. Please try again.');
    }
  };

  useEffect(() => {
    // Fetch initial weather data and last five days data for a default city
    const defaultCity = 'London';
    fetchWeather(defaultCity);
    fetchLastFiveDaysData(defaultCity);
  }, []);

  const handleSearch = (city) => {
    // Perform search operation with the city
    fetchWeather(city);
    fetchLastFiveDaysData(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Advanced Weather Dashboard</h1>
      </header>
      <WeatherForm onSearch={(location) => fetchWeather(location)} />
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-container">
          <WeatherDisplay weather={weather} lastFiveDaysData={lastFiveDaysData} />
        </div>
      )}
      <WeatherMap onMapClick={(coords) => fetchWeather(coords)} />
    </div>
  );
};

export default App;
