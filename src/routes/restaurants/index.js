import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import List from './components/List'
import CategoryFilter from './components/Filters/Category'
import Sort from './components/Sort'
import NumberOfResults from './components/NumberOfResults'

import './style'

class RestaurantsList extends Component {
  constructor (props) {
    super(props)

    props.getRestaurants()
    props.getFilters()
  }

  render () {
    return (
      <div className='restaurants'>
        <img src='https://via.placeholder.com/200x200' className='logo-brand' />
        <div className='filters-sort-bar'>
          <NumberOfResults />
          <h5 className='filters'>Filter</h5>
          <CategoryFilter />
          <Sort />
        </div>
        <List />
      </div>
    )
  }
}

export default inject(allStores => ({
  getRestaurants: allStores.main.getRestaurants,
  getFilters: allStores.main.getFilters
}))(observer(RestaurantsList))
