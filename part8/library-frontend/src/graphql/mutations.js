import { gql } from '@apollo/client'
import {
  RESPONSE_DATA,
  BOOK_DATA,
  AUTHOR_DATA
} from './fragments'

export const ADD_NEW_BOOK = gql`
  mutation AddNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...ResponseData
      book {
        ...BookData
      }
      author {
        ...AuthorData
      }
    }
  }
  ${RESPONSE_DATA}
  ${BOOK_DATA}
  ${AUTHOR_DATA}
`

export const UPDATE_AUTHOR_BORN = gql`
  mutation UpdateAuthorBorn ($name: String!, $setBorn: Int!) {
    editAuthor(
      name: $name
      setBorn: $setBorn
    ) {
      ...ResponseData
      author {
        ...AuthorData
      }
    }
  }
  ${RESPONSE_DATA}
  ${AUTHOR_DATA}
`