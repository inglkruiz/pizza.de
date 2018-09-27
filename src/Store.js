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
      loadedRestaurants: [],
      restaurantSelected: null,
      filters: {
        categories: []
      },
      filteringBy: getFiltersFromURLAsObject()
    })
  }

  loadRestaurants = () => {
    getRestaurants()
      .then(this.setLoadedRestaurants)
  }

  setLoadedRestaurants = action('setLoadedRestaurants', (loadedRestaurants) => {
    this.loadedRestaurants = loadedRestaurants
  })

  getFilters = () => {
    getFilters()
      .then(this.setFilters)
  }

  setFilters = action('setFilters', (filters) => {
    this.filters = filters
  })

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
      .then(this.setRestaurantSelected)
  }

  setRestaurantSelected = action('setRestaurantSelect', (restaurant) => {
    this.restaurantSelected = restaurant
  })

  filter = (restaurant) => {
    return restaurant.categories.indexOf(this.filteringBy.category) !== -1
  }

  sort = (a, b) => {
    switch (this.filteringBy.sort) {
      case 'rating':
        return a.averageRating - b.averageRating
      default:
        return a.index - b.index
    }
  }

  get restaurants () {
    const { filteringBy, loadedRestaurants, filters } = this
    let list
    if (filteringBy.category && filters.categories.indexOf(filteringBy.category) !== -1) {
      list = loadedRestaurants.filter(this.filter)
    } else {
      list = loadedRestaurants
    }

    list = list.sort(this.sort)

    return list
  }
}

const store = new Store()

export default store
