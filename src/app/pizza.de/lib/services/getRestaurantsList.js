import fetch from '../fetchWithToken'

let promise

/**
 * Executes call to service and saves it in a promise.
 */
function executeCall() {
  promise = fetch('restaurants')
    .then(response => {
      if (response instanceof Promise) {
        response.then(() => executeCall())
        throw new Error('Unathorized by Token')
      }
      return response
    })
    .then(({ data }) => data)
    .then(mapData)

  return promise
}

/**
 * Gets restaurants from mapped data
 * @param {Object} data Mapped data
 * @returns {Array}
 */
function getRestaurantsData(data = {}) {
  return data.restaurants
}

/**
 * Gets filters from mapped data
 * @param {Object} data Mapped data
 * @returns {Array}
 */
function getFiltersData(data = {}) {
  return data.filters
}

/**
 * Maps restaurants data to a simple object useful for frontend
 * @param {Array} data
 * @returns {Object}
 */
function mapData(data = []) {
  const dataMap = new Map()
  const categories = new Set()
  data.forEach((r, i) => {
    if (!dataMap.has(r.id)) {
      const restaurantCategoriesArray = r.general.categories[0].split(',')

      categories.add(...restaurantCategoriesArray)

      dataMap.set(r.id, {
        index: i,
        id: r.id,
        logo: r.general.logo_uri,
        name: r.general.name,
        averageRating: r.rating.average,
        location: `${r.address.street_name} ${r.address.street_number} - ${
          r.address.city
        }, ${r.address.country}`,
        categories: restaurantCategoriesArray
      })
    }
  })
  return {
    restaurants: Array.from(dataMap.values()),
    filters: {
      categories: Array.from(categories.values()).sort((a, b) => {
        const A = a.toUpperCase() // ignore upper and lowercase
        const B = b.toUpperCase() // ignore upper and lowercase
        if (A < B) {
          return -1
        }
        if (A > B) {
          return 1
        }

        // names must be equal
        return 0
      })
    }
  }
}

/**
 * Returns service promise if already exists. If promise is `undefined` executeCall to save promise and returns it.
 * @returns {Promise}
 */
function fetchRestaurants() {
  if (promise) {
    return promise
  }

  return executeCall()
}

// PUBLIC

/**
 * Returns mapped data attribute from promise response
 * @returns {Promise}
 */
export function getRestaurants() {
  return fetchRestaurants()
    .then(getRestaurantsData)
    .catch(error => {
      console.log('request failed', error)
    })
}

/**
 * Returns mapped data attribute from promise response
 * @returns {Promise}
 */
export function getFilters() {
  return fetchRestaurants()
    .then(getFiltersData)
    .catch(error => {
      console.log('request failed', error)
    })
}
