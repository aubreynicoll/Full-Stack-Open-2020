import React, {useState} from 'react';
import Entry from './components/Entry';

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        
        if (!persons.some((person) => person.name === newName)) {
            const newPersons = persons.concat({name: newName})
            setPersons(newPersons)
            setNewName('')
        }
        else {
            window.alert(`${newName} is already an entry.`)
        }
    }

    const handleInputNewName = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input 
                                value={newName}
                                onChange={handleInputNewName} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => 
                <Entry 
                    key={person.name}
                    person={person} />
            )}
        </div>
    )
}

export default App;
