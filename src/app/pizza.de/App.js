import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import './lib/fontawesomeLibrary'

import { hot } from 'react-hot-loader'

import Restaurants from './routes/restaurants'
import Restaurant from './routes/restaurant'
import AuthorizationError from './routes/authorization-error'
import routes from './routes'

import './style.scss'

if (!BUNDLING_PRODUCTION) {
  import('./style-tablet.scss')
}

if (BUNDLING_PRODUCTION && window.innerWidth >= 768) {
  import('./style-tablet.scss')
}

export default hot(module)(function App() {
  return (
    <div className="container">
      <Router basename={routes.basename}>
        <Switch>
          <Route path={routes.restaurants} component={Restaurants} />
          <Route path={`${routes.restaurant}:id/`} component={Restaurant} />
          <Route
            path={routes.authorizationError}
            component={AuthorizationError}
          />
          <Redirect to={routes.restaurants} />
        </Switch>
      </Router>
    </div>
  )
})
