import { gql } from '@apollo/client'
import {
  AUTHOR_DATA,
  BOOK_DATA} from './fragments'

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