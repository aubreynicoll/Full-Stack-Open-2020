import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook (
    $title: String! 
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook (
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor (
    $name: String!
    $setBorn: Int!
  ) {
    editAuthor (
      name: $name
      setBorn: $setBorn
    ) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login (
    $username: String!
    $password: String!
  ) {
    login (
      username: $username
      password: $password
    ) {
      value
    }
  }
`