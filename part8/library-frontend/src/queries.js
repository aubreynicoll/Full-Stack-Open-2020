import { gql } from '@apollo/client'

const AUTHOR_DATA = gql`
  fragment AuthorData on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DATA = gql`
  fragment BookData on Book {
    title
    author
    published
    genres
    id
  }
`

export const FETCH_ALL_AUTHORS = gql`
  query FetchAllAuthors {
    allAuthors {
      ...AuthorData
    }
  }
  ${AUTHOR_DATA}
`

export const FETCH_ALL_BOOKS = gql`
  query FetchAllBooks {
    allBooks {
      ...BookData
    }
  }
  ${BOOK_DATA}
`