import React from 'react';

const Entry = ({person, deletePerson}) => {
    return (
        <div>
            {person.name} {person.number}
            <button
              type="button"
              onClick={deletePerson}>
              delete person
            </button>

        </div>
    )
}

export default Entry
