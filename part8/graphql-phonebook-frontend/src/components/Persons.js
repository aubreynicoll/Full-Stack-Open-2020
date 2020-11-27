import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FIND_PERSON } from '../queries/index'

const Persons = ({ persons }) => {
  const [person, setPerson] = useState(null)
  const [getPerson, result] = useLazyQuery(FIND_PERSON)

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      <ul>
        {persons.map(p => (
          <li key={p.id}>
            {p.name} - {p.phone}
            <button onClick={() => showPerson(p.name)}>details</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons