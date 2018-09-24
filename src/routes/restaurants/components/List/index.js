import React from 'react'
import { inject, observer } from 'mobx-react'

import { RestaurantAsLink as Restaurant } from '../../../../components/Restaurant'

function List ({ restaurants }) {
  return (
    restaurants.map(r => (<Restaurant key={r.id} {...r} />))
  )
}

export default inject(allStores => ({
  restaurants: allStores.main.restaurants
}))(observer(List))
