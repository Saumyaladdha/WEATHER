// WeatherForm.js
import React, { useState } from 'react';
import './WeatherForm.css'; // For styling the form

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return; // Prevents submitting an empty form
    onSearch(city); // Trigger the search function passed as prop
    setCity(''); // Reset the input field after submission
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="weather-input"
      />
      <button type="submit" className="weather-submit-btn">Search</button>
    </form>
  );
};

export default WeatherForm;
