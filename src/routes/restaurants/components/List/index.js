import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { RestaurantAsLink as Restaurant } from '../../../../components/Restaurant'

class List extends Component {
  filter = (restaurant) => {
    return restaurant.categories.indexOf(this.props.filteringBy.category) !== -1
  }

  sort = (a, b) => {
    switch (this.props.filteringBy.sort) {
      case 'rating':
        return a.averageRating - b.averageRating
      default:
        return a.index - b.index
    }
  }

  render () {
    const { filteringBy, restaurants, filters } = this.props
    let list

    if (filteringBy.category && filters.categories.indexOf(filteringBy.category) !== -1) {
      list = restaurants.filter(this.filter)
    } else {
      list = restaurants
    }

    list = list.sort(this.sort)

    if (!list.length) return null

    return (
      list.map(r => (<Restaurant key={r.id} {...r} />))
    )
  }
}

export default inject(allStores => ({
  restaurants: allStores.main.restaurants,
  filteringBy: allStores.main.filteringBy,
  filters: allStores.main.filters
}))(observer(List))
