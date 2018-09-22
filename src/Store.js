import { extendObservable, action, configure } from 'mobx'
import { getRestaurants, getFilters } from './lib/services/getRestaurantsList'
import { CATEGORY_KEY } from './routes/restaurants/components/Filters/Category'
import { RATING_KEY } from './routes/restaurants/components/Sort'

configure({
  enforceActions: 'observed'
})

class Store {
  constructor () {
    extendObservable(this, {
      restaurants: [],
      filters: {
        categories: []
      },
      filtering: {
        byCategory: ''
        // avgRating: 0
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
        if (value) {
          this.filtering.byCategory = value
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
  })

  sort = action('sort', (by) => {
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
  })
}

const store = new Store()

export default store
