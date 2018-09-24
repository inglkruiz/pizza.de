import fetch from '../fetchWithToken'

let promises = []

/**
 * Executes call to service.
 */
function executeCall (id) {
  promises[id] = fetch(`restaurants/${id}`)
    .then(response => {
      if (response instanceof Promise) {
        response.then(() => executeCall(id))
        throw new Error('Unathorized by Token')
      }
      return response
    })
    .then(data => (mapData(Object.assign(data, { id }))))

  return promises[id]
}

/**
 * Maps restaurant data to a simple object useful for frontend
 * @param {Array} data
 * @returns {Object}
 */
function mapData (data) {
  return {
    base: {
      index: 0,
      id: data.id,
      logo: data.info.logoUri,
      name: data.info.name,
      averageRating: data.rating.average,
      location: `${data.address.streetName} ${data.address.streetNumber} - ${data.address.city}, ${data.address.country}`,
      categories: data.info.categories,
      shown: true
    },
    menu: data.sections
  }
}

// PUBLIC

/**
 *
 * @returns {Promise}
 */
function fetchRestaurant (id) {
  if (promises[id]) {
    return promises[id]
  }

  return executeCall(id)
}

/**
 *
 * @returns {Promise}
 */
export function getRestaurant (id) {
  return fetchRestaurant(id)
    .catch((error) => {
      console.log('request failed', error)
    })
}
