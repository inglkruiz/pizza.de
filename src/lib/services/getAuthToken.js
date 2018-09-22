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
  promise = fetch(`${URLs.MAIN_API}auth`)
    .then(response => response.json())
    .then(({ token }) => {
      if (window.sessionStorage) {
        sessionStorage.setItem('token', token)
      }

      return token
    })
}

export default promise
