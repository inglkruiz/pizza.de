import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { restaurants } from '..'
import { RestaurantAsBlock } from '../../components/Restaurant'
import Menu from './components/Menu'

import './style'

class RestaurantDetails extends Component {
  constructor (props) {
    super(props)

    this.props.getRestaurantSelected(this.props.match.params.id)
  }

  componentWillUnmount () {
    this.props.setRestaurantSelected(null)
  }

  render () {
    if (!this.props.restaurantSelected) return null

    return (
      <div className='restaurant-details'>
        <Link
          className='btn btn-lg btn-light restaurant-details__back-btn'
          to={restaurants}
        >
          <i className='icon-angle-left' />
          Back to Results
        </Link>
        <RestaurantAsBlock {...this.props.restaurantSelected.base} />
        <Menu menu={this.props.restaurantSelected.menu} />
      </div>
    )
  }
}

export default inject(allStores => ({
  getRestaurantSelected: allStores.main.getRestaurantSelected,
  restaurantSelected: allStores.main.restaurantSelected,
  setRestaurantSelected: allStores.main.setRestaurantSelected
}))(observer(RestaurantDetails))
