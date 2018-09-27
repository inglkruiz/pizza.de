import React from 'react'
import Loadable from 'react-loadable'
import { inject, observer } from 'mobx-react'
import Loading from '../../components/Loading'

const Restaurants = Loadable({
  loader: () => import('./Component'),
  loading: () => (<Loading />)
})

export default inject(allStores => ({
  loadRestaurants: allStores.main.loadRestaurants,
  getFilters: allStores.main.getFilters
}))(observer(Restaurants))
