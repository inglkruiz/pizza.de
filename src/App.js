import React from 'react'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader'

import Restaurants from './routes/restaurants'

export default hot(module)(function App () {
  return (
    <div className='container'>
      <Router >
        <Restaurants default path='restaurants' />
      </Router>
    </div>
  )
})
