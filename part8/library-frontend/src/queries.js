import { gql } from '@apollo/client'

const AUTHOR_DATA = gql`
  fragment AuthorData on Author {
    name
    born
    bookCount
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