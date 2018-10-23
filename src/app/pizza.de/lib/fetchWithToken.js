import { fetch } from 'whatwg-fetch'
import URLs from './URLs'
import getAuthTokenPromise, { resetToken } from './services/getAuthToken'

export default function fetchWithToken(endpoint, config = {}) {
  return getAuthTokenPromise
    .then(token =>
      fetch(
        `${URLs.MAIN_API}${endpoint}`,
        Object.assign(config, {
          headers: {
            token
          }
        })
      )
    )
    .then(response => {
      if (response.status === 401) {
        return resetToken()
      }
      return response.json()
    })
}
