import React from 'react'
import Loadable from 'react-loadable'
import { inject, observer } from 'mobx-react'
import Loading from '../../components/Loading'

const Restaurant = Loadable({
  loader: () => import('./Component'),
  loading: () => (<Loading />)
})

export default inject(allStores => ({
  getRestaurantSelected: allStores.main.getRestaurantSelected,
  restaurantSelected: allStores.main.restaurantSelected,
  setRestaurantSelected: allStores.main.setRestaurantSelected
}))(observer(Restaurant))
