import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloLink, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('userToken')
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    authMiddleware, 
    httpLink
  ])
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
)