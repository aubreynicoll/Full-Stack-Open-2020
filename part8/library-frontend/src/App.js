
import React from 'react'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {

  return (
    <Router>
      <Link to="/">
        <button>Authors</button>
      </Link>
      <Link to="/books">
        <button>Books</button>
      </Link>
      <Link to="new">
        <button>New Book</button>
      </Link>

      <Switch>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/new">
          <NewBook />
        </Route>
        <Route path="/">
          <Authors />
        </Route>
      </Switch>
    </Router>
  )
}

export default App