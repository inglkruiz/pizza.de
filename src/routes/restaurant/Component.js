import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { restaurants } from '../../routes'
import { RestaurantAsBlock } from '../../components/Restaurant'
import Menu from './components/Menu'

import './style'

class Restaurant extends Component {
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
        <Link className='btn btn-lg btn-light restaurant-details__back-btn' to={restaurants}><i className='icon-angle-left' />Back to Results</Link>
        <RestaurantAsBlock {...this.props.restaurantSelected.base} />
        <Menu menu={this.props.restaurantSelected.menu} />
      </div>
    )
  }
}

export default Restaurant
