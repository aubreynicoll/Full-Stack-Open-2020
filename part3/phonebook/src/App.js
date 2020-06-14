import React, {useState, useEffect} from 'react';
import Entry from './components/Entry';
import NewEntryForm from './components/NewEntryForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
      personsService
        .getAll()
        .then(all => {
          setPersons(all)
        })
    }, [])

    const entriesToShow = searchName === ''
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some((person) => person.number === newNumber)) {
            setNotificationMessage(`The number ${newNumber} is in use by another individual.`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000)
        }
        else if (persons.some(person => person.name === newName)) {
          const result = window.confirm(`${newName} is already an entry. do you wish to update the entry?`)
          
          if (result) {       
            const person = persons.find(p => p.name === newName)     
            const newPerson = {...person, number: newNumber}
            personsService
              .updatePerson(person.id, newPerson)
              .then(updatedPerson => {
                setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
                setNotificationMessage(`${person.name}'s number was successfully updated`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 2000)
                setNewName('')
                setNewNumber('')
              })
              .catch(() => {
                setPersons(persons.filter(p => p.id !== person.id))
                setNotificationMessage(`${person.name}'s number has been removed from the server`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 2000)                
                setNewName('')
                setNewNumber('')
              })
          }
        }         
        else {
            const newPerson = {
              name: newName,
              number: newNumber
            }
            personsService
              .createPerson(newPerson)
              .then(createdPerson => {
                setPersons(persons.concat(createdPerson))
                setNotificationMessage(`${createdPerson.name}'s number was successfully added`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 2000)
                setNewName('')
                setNewNumber('')
              })
        }
    }

    const deletePerson = (person) => {
      const result = window.confirm(`this will delete ${person.name}. are you sure?`)
      if (result) {
        personsService
          .deletePerson(person.id)
          .then(deletedPerson => {
            setPersons(persons.filter(p => p.id !== person.id))
            setNotificationMessage(`${person.name}'s number was successfully deleted`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 2000)
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== person.id))
            setNotificationMessage(`${person.name}'s number has been removed from the server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 2000)
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
            <Notification message={notificationMessage} />
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
                    person={person}
                    deletePerson={() => deletePerson(person)} />
            )}
        </div>
    )
}

export default App;
