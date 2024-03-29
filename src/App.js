import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
const api = {
  key: "fb7d32b2fdb2dcce943201ebdb739bc9",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(weather);
    });
  }
}

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className={
      (typeof weather.main != "undefined") 
        ? ((weather.main.temp > 40) 
          ? 'app warm' 
          : 'app')
        : 'app'}>
      <main>
        <div className='title'>
          <h2>Weather App</h2>
        </div>
        <div className="search-box">
            <input
              type="text"
              className='search-bar'
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
              />
        </div>
          {(typeof weather.main != "undefined") ? (
          <div>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
                <div className='temp'>
                  {Math.round(weather.main.temp)}°F
                </div>
                <div className='temp-min-max'>
                Min: {Math.round(weather.main.temp_min)}°F
                Max: {Math.round(weather.main.temp_max)}°F
                Feels like: {Math.round(weather.main.feels_like)}°F
                </div>
                <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
