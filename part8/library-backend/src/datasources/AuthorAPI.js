const { DataSource } = require('apollo-datasource')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

class AuthorAPI extends DataSource {
  constructor() {
    super()
    this.authors = authors
  }

  countDocuments() {
    return this.authors.length
  }

  getAllAuthors() {
    return this.authors
  }

  createNewAuthor({ authorData }) {
    const existingAuthor = this.authors.find(a => a.name === authorData.name)
    
    if (existingAuthor) return null

    const newAuthor = {
      ...authorData,
      born: null,
      id: uuid()
    }
    this.authors = [...this.authors, newAuthor]
    return newAuthor
  }

  updateAuthorBorn ({ authorData }) {
    const existingAuthor = this.authors.find(a => a.name === authorData.name)

    if (!existingAuthor) return null

    const updatedAuthor = {
      ...existingAuthor,
      born: authorData.setBorn
    }
    this.authors = this.authors.map(a => a.id === updatedAuthor.id ? updatedAuthor : a)
    return updatedAuthor
  }
}

module.exports = AuthorAPI