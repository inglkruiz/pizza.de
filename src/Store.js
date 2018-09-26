import { extendObservable, action, configure } from 'mobx'
import { getRestaurants, getFilters } from './lib/services/getRestaurantsList'
import { getRestaurant } from './lib/services/getRestaurant'
import { asString as getFiltersFromURLAsString, asObject as getFiltersFromURLAsObject } from './lib/getFiltersFromURL'

configure({
  enforceActions: 'observed'
})

class Store {
  constructor () {
    extendObservable(this, {
      restaurants: [],
      restaurantSelected: null,
      filters: {
        categories: []
      },
      filteringBy: getFiltersFromURLAsObject()
    })
  }

  getRestaurants = () => {
    getRestaurants()
      .then(action('setRestaurants', this.setRestaurants))
  }

  setRestaurants = (restaurants) => {
    this.restaurants.replace(restaurants)
  }

  getFilters = () => {
    getFilters()
      .then(action('setFilters', this.setFilters))
  }

  setFilters = (filters) => {
    this.filters = filters
  }

  setFilteringByCategory = action('setCategoryFilter', (value) => {
    this.filteringBy.category = value

    return this.getFiltersFromURL()
  })

  setFilterinBySort = action('setFilterinBySort', (value) => {
    this.filteringBy.sort = value

    return this.getFiltersFromURL()
  })

  getFiltersFromURL = () => getFiltersFromURLAsString(this.filteringBy)

  getRestaurantSelected = (id) => {
    getRestaurant(id)
      .then(action('setRestaurantSelect', this.setRestaurantSelected))
  }

  setRestaurantSelected = (restaurant) => {
    this.restaurantSelected = restaurant
  }
}

const store = new Store()

export default store
