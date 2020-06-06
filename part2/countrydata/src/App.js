import React, {useState, useEffect} from 'react'
import SearchBar from './components/SearchBar'
import CountryData from './components/CountryData'
import ShowDataButton from './components/ShowDataButton'

import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((promise) => {
        setCountries(promise.data)
      })
  }, [])

  const searchInputHandler = (event) => {
    setSearchName(event.target.value)
  }

  const showDataButtonHandler = (countryName) => {
    setSearchName(countryName)
  }

  const displaySearchResults = () => {
    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchName.toLowerCase()))

    if (searchName === '') {
      return
    }
    else if (filteredCountries.length > 10) {
      return (
        <p>too many matches, please specify another filter</p>
      )
    }
    else if (filteredCountries.length > 1) {
      return (
        filteredCountries.map((country) =>
          <p key={country.name}>
            {country.name}
            <ShowDataButton
              onClick={() => showDataButtonHandler(country.name)}
            />
          </p>
        )
      )
    }
    else if (filteredCountries.length === 1) {
      return (
        <CountryData country={filteredCountries[0]} />
      )
    }
    else {
      return (
        <p>no matches</p>
      )
    }
  }

  return (
    <div>
      <SearchBar
        text="find a country:"
        searchName={searchName}
        searchInputHandler={searchInputHandler}
      />
      {displaySearchResults()}
    </div>
  )
}

export default App
