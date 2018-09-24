import React from 'react'
import { inject, observer } from 'mobx-react'

function NumberOfResults (props) {
  return (
    <h5>
      We Found {this.props.restaurants.length} Restaurants for You!
    </h5>
  )
}

export default inject(allStores => ({
  restaurants: allStores.main.restaurants
}))(observer(NumberOfResults))
