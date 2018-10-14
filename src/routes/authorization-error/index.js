import React, { Component } from 'react'
import { restaurants as RestaurantsRoute } from '../index'
import { SESSION_STORAGE_AUTHORIZATION_ERROR_KEY } from '../../lib/constants'

class AuthorizationError extends Component {
  handleReload = () => {
    sessionStorage.removeItem(SESSION_STORAGE_AUTHORIZATION_ERROR_KEY)
    window.location.assign(`${window.location.origin}${RestaurantsRoute}`)
  }

  render () {
    return (
      <div className='authorization-error'>
        <h1>Network request failed</h1>
        <h2>
          Maybe because SSL certification has expired. Navigate to{' '}
          <a
            href='https://mockapi.pizza.de/v1/auth'
            target='_blank'
            rel='noopener noreferrel'
          >
            https://mockapi.pizza.de/v1/auth
          </a>{' '}
          and allow access to this URL then click{' '}
          <button
            className='btn btn-primary btn-lg'
            type='button'
            onClick={this.handleReload}
          >
            Reload
          </button>
          .
        </h2>
      </div>
    )
  }
}

export default AuthorizationError
