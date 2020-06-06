import React, {useState, useEffect} from 'react'

import axios from 'axios'

const CountryData = ({country}) => {
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
      access_key: api_key,
      query: country.capital
    }

    axios
      .get('http://api.weatherstack.com/current', {params})
      .then((promise) => {
        setWeatherData(promise.data)
      })
  }, [])

  const displayWeatherData = () => {
    if (typeof weatherData !== "undefined") {
      return (
        <>
          <h3>weather in {country.capital}</h3>
          <p>temp: {weatherData.current.temperature} celsius</p>
          <img
            src={weatherData.current.weather_icons}
            alt="weather icons"
            width="100"
            height="100"
          />
          <p>wind: {weatherData.current.wind_speed} mph {weatherData.current.wind_dir}</p>
        </>
      )
    }
  }

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language) =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>

      <h3>flag</h3>
      <img
        src={country.flag}
        alt="national flag"
        width="250"
        height="250"
      />

      {displayWeatherData()}
    </>
  )
}

export default CountryData
