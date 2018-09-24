import { extendObservable, action, configure } from 'mobx'
import { getRestaurants, getFilters } from './lib/services/getRestaurantsList'
import { getRestaurant } from './lib/services/getRestaurant'
import getFiltersFromURL from './lib/getFiltersFromURL'
import { CATEGORY_KEY } from './routes/restaurants/components/Filters/Category'
import { RATING_KEY } from './routes/restaurants/components/Sort'

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
      filteringBy: {
        category: '',
        sort: ''
      }
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

  filter = action('filter', (by, value) => {
    switch (by) {
      case CATEGORY_KEY:
        this.filteringBy.category = value
        if (value) {
          this.restaurants = this.restaurants.map(r => {
            r.shown = !(r.categories.indexOf(value) === -1)
            return r
          })
        } else {
          this.restaurants = this.restaurants.map(r => {
            r.shown = true
            return r
          })
        }
        break
    }
    return this.getFiltersFromURL()
  })

  sort = action('sort', (by) => {
    this.filteringBy.sort = by.toLowerCase()
    switch (by) {
      case RATING_KEY:
        this.restaurants = this.restaurants.sort((a, b) => {
          return a.averageRating - b.averageRating
        })
        break
      default:
        this.restaurants = this.restaurants.sort((a, b) => {
          return a.index - b.index
        })
    }
    return this.getFiltersFromURL()
  })

  getFiltersFromURL = () => getFiltersFromURL(this.filteringBy)

  getRestaurant = (id) => {
    getRestaurant(id)
      .then(action('setRestaurantSelect', this.setRestaurantSelected))
  }

  setRestaurantSelected = (restaurant) => {
    this.restaurantSelected = restaurant
  }
}

const store = new Store()

export default store
