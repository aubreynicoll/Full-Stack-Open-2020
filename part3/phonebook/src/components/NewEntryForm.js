import React from 'react';

const NewEntryForm = (props) => {
    const { addPerson,
            newName,
            handleInputNewName,
            newNumber,
            handleInputNewNumber
    } = props

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                            value={newName}
                            onChange={handleInputNewName} />
            </div>
            <div>
                number: <input
                            value={newNumber}
                            onChange={handleInputNewNumber} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default NewEntryForm
