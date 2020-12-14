import { gql } from '@apollo/client'
import { AUTHOR_DATA, BOOK_DATA, BOOK_GENRES_DATA, USER_DATA } from './fragments'

export const FETCH_ALL_AUTHORS = gql`
  query FetchAllAuthors {
    allAuthors {
      ...AuthorData
    }
  }
  ${AUTHOR_DATA}
`

export const FETCH_ALL_BOOKS = gql`
  query FetchAllBooks($author: String, $genre: String) {
    allBooks(
      author: $author
      genre: $genre
    ) {
      ...BookData
    }
  }
  ${BOOK_DATA}
`

export const FETCH_ALL_BOOKS_GENRES = gql`
  query FetchAllBooksGenres {
    allBooks {
      ...BookGenresData
    }
  }
  ${BOOK_GENRES_DATA}
`

export const ME = gql`
  query Me {
    me {
      ...UserData
    }
  }
  ${USER_DATA}
`