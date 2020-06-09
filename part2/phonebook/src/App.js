import React, {useState, useEffect} from 'react';
import Entry from './components/Entry';
import NewEntryForm from './components/NewEntryForm';
import Filter from './components/Filter';

import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then((promise) => {
          setPersons(promise.data)
        })
    }, [])

    const entriesToShow = searchName === ''
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some((person) => person.name === newName)) {
            window.alert(`${newName} is already an entry.`)
        }
        else if (persons.some((person) => person.number === newNumber)) {
            window.alert(`The number ${newNumber} is in use by another individual.`)
        }
        else {
            const newPerson = {
              name: newName,
              number: newNumber
            }
            axios
              .post('http://localhost:3001/persons', newPerson)
              .then(promise => {
                const newPersons = persons.concat(promise.data)
                setPersons(newPersons)
                setNewName('')
                setNewNumber('')
              })
        }
    }

    const handleInputSearchName = (event) => {
        setSearchName(event.target.value)
    }

    const handleInputNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleInputNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                searchName={searchName}
                handleInputSearchName={handleInputSearchName} />

            <h2>Request for New Entry</h2>
            <NewEntryForm
                addPerson={addPerson}
                newName={newName}
                handleInputNewName={handleInputNewName}
                newNumber={newNumber}
                handleInputNewNumber={handleInputNewNumber} />

            <h2>Numbers</h2>
            {entriesToShow.map((person) =>
                <Entry
                    key={person.name}
                    person={person} />
            )}
        </div>
    )
}

export default App;
