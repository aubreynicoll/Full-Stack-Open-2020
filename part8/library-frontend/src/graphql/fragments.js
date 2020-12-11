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
    author
    published
    genres
    id
  }
`