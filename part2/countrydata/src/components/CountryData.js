import React from 'react'

const CountryData = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) =>
          <li key={country.name}>{language.name}</li>
        )}
      </ul>
      <img
        src={country.flag}
        alt="national flag"
        width="250"
        height="250"
      />
    </>
  )
}

export default CountryData
