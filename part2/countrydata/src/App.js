import React, {useState, useEffect} from 'react';
import SearchBar from './components/SearchBar';

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

  const displaySearchResults = () => {
    if (searchName === '') {
      return
    }
    else if (countries.filter((country) => country.name.toLowerCase().includes(searchName.toLowerCase()).length > 10)) {
      return (<p>too many matches, please specify another filter</p>)
    }
    else if (countries.filter((country) => country.name.toLowerCase().includes(searchName.toLowerCase()).length > 1)) {
      return
    }
  }

  return (
    <div>
      <SearchBar
        text="find a country:"
        searchName={searchName}
        searchInputHandler={searchInputHandler}
      />
      <div>
        {displaySearchResults()}
      </div>
    </div>
  )
}

export default App;
