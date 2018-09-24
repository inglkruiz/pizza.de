import { fetch } from 'whatwg-fetch'
import URLs from '../URLs'

let token

if (window.sessionStorage) {
  token = sessionStorage.getItem('token')
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
function getToken () {
  return fetchToken()
    .then(setToken)
}

/**
 *
 * @param {Object} { token }
 */
function setToken ({ token }) {
  if (window.sessionStorage) {
    sessionStorage.setItem('token', token)
  }

  return token
}

/**
 *
 */
function fetchToken () {
  return fetch(`${URLs.MAIN_API}auth`)
    .then(response => response.json())
}

export function resetToken (params) {
  sessionStorage.removeItem('token')
  promise = getToken()

  return promise
}

export default promise
