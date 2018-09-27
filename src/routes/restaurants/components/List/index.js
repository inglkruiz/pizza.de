import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { RestaurantAsLink as Restaurant } from '../../../../components/Restaurant'

class List extends Component {
  render () {
    const { restaurants } = this.props

    if (!restaurants.length) return null

    return (
      restaurants.map(r => (<Restaurant key={r.id} {...r} />))
    )
  }
}

export default inject(allStores => ({
  restaurants: allStores.main.restaurants
}))(observer(List))
