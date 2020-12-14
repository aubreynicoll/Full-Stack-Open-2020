import { gql } from '@apollo/client'

export const AUTHOR_DATA = gql`
  fragment AuthorData on Author {
    name
    born
    bookCount
    id
  }
`

export const BOOK_DATA = gql`
  fragment BookData on Book {
    title
    author {
      ...AuthorData
    }
    published
    genres
    id
  }
  ${AUTHOR_DATA}
`

export const TOKEN_DATA = gql`
  fragment TokenData on Token {
    value
  }
`

export const BOOK_GENRES_DATA = gql`
  fragment BookGenresData on Book {
    genres
  }
`

export const USER_DATA = gql`
  fragment UserData on User {
    username
    favoriteGenre
    id
  }
`