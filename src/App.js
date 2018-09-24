import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Restaurants from './routes/restaurants'
import Restaurant from './routes/restaurant'
import routes from './routes'

export default hot(module)(function App () {
  return (
    <div className='container'>
      <Router basename={routes.basename}>
        <Switch>
          <Route path={routes.restaurants} component={Restaurants} />
          <Route path={`${routes.restaurant}:id/`} component={Restaurant} />
        </Switch>
      </Router>
    </div>
  )
})
