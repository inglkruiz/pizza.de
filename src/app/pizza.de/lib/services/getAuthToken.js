import { fetch } from 'whatwg-fetch'
import URLs from '../URLs'
import {
  authorizationError as authorizationErrorRoute,
  basename
} from '../../routes'
import {
  SESSION_STORAGE_TOKEN_KEY,
  SESSION_STORAGE_AUTHORIZATION_ERROR_KEY
} from '../constants'

let token

if (window.sessionStorage) {
  token = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)
}

let promise

if (token) {
  promise = Promise.resolve(token)
} else {
  promise = getToken()
}

/**
 *
 */
function getToken() {
  return fetchToken().then(setToken)
}

/**
 *
 * @param {Object} { token }
 */
function setToken({ token }) {
  if (window.sessionStorage) {
    sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, token)
  }

  return token
}

/**
 *
 */
function fetchToken() {
  const authorizationError = sessionStorage.getItem(
    SESSION_STORAGE_AUTHORIZATION_ERROR_KEY
  )
  if (!authorizationError) {
    return fetch(`${URLs.MAIN_API}auth`)
      .then(response => response.json())
      .catch(() => {
        sessionStorage.setItem(SESSION_STORAGE_AUTHORIZATION_ERROR_KEY, true)
        window.location.assign(
          `${window.location.origin}${basename}${authorizationErrorRoute}`
        )
      })
  }
  return Promise.reject(
    new Error('Network request failed - Authorization token request')
  )
}

export function resetToken(params) {
  sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY)
  promise = getToken()

  return promise
}

export default promise
