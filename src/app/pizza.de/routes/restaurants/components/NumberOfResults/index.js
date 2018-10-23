import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function NumberOfResults({ restaurants }) {
  if (!restaurants.length) return null
  return <h5>We Found {restaurants.length} Restaurants for You!</h5>
}

NumberOfResults.propTypes = {
  restaurants: PropTypes.array
}

export default inject(allStores => ({
  restaurants: allStores.main.restaurants
}))(observer(NumberOfResults))
