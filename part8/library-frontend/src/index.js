import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import cache from './cache'

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
)