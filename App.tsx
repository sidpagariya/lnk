import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import AppLayout from './AppLayout'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = (): React.ReactFragment => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Route path="/:ref?" component={AppLayout} />
      </Router>
    </React.Fragment>
  )
}

export default App
