import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Restaurants from './routes/restaurants'
import Restaurant from './routes/restaurant'
import AuthorizationError from './routes/authorization-error'
import routes from './routes'

export default hot(module)(function App () {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route path={routes.restaurants} component={Restaurants} />
          <Route path={`${routes.restaurant}:id/`} component={Restaurant} />
          <Route path={routes.authorizationError} component={AuthorizationError} />
          <Redirect to={routes.restaurants} />
        </Switch>
      </Router>
    </div>
  )
})
