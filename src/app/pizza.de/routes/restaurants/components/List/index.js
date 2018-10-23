import React from 'react'
import { inject, observer } from 'mobx-react'

import Restaurant from '../../../../components/Restaurant/Link'

function List() {
  const { restaurants } = this.props

  if (!restaurants.length) return null

  return restaurants.map(r => <Restaurant key={r.id} {...r} />)
}

export default inject(allStores => ({
  restaurants: allStores.main.restaurants
}))(observer(List))
