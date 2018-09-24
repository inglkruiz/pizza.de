import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { restaurants } from '../../routes'
import { RestaurantAsBlock as Restaurant } from '../../components/Restaurant'
import Menu from './components/Menu'

import './style'

class RestaurantsList extends Component {
  constructor (props) {
    super(props)

    this.props.getRestaurant(this.props.match.params.id)
  }

  componentWillUnmount () {
    this.props.setRestaurantSelected(null)
  }

  render () {
    if (!this.props.restaurantSelected) return null
    return (
      <div className='restaurant-details'>
        <Link className='btn btn-lg btn-light restaurant-details__back-btn' to={restaurants}><i className='icon-angle-left' />Back to Results</Link>
        <Restaurant {...this.props.restaurantSelected.base} />
        <Menu menu={this.props.restaurantSelected.menu} />
      </div>
    )
  }
}

export default inject(allStores => ({
  getRestaurant: allStores.main.getRestaurant,
  restaurantSelected: allStores.main.restaurantSelected,
  setRestaurantSelected: allStores.main.setRestaurantSelected
}))(observer(RestaurantsList))
