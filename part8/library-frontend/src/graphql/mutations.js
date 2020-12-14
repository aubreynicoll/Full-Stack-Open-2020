import { gql } from '@apollo/client'
import { AUTHOR_DATA, BOOK_DATA, TOKEN_DATA } from './fragments'

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookData
    }
  }
  ${BOOK_DATA}
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBorn: Int!) {
    editAuthor(
      name: $name
      setBorn: $setBorn
    ) {
      ...AuthorData
    }
  }
  ${AUTHOR_DATA}
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      ...TokenData
    }
  }
  ${TOKEN_DATA}
`