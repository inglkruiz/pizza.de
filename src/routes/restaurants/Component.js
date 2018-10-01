import React, { Component } from 'react'

import List from './components/List'
import CategoryFilter from './components/Filters/Category'
import Sort from './components/Sort'
import NumberOfResults from './components/NumberOfResults'

import './style'

if (BUNDLING_PRODUCTION && window.innerWidth >= 768) {
  import('./style-tablet')
}

class Restaurants extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mobileSideMenuIsOpen: false
    }

    props.loadRestaurants()
    props.getFilters()
  }

  handleMobileFiltersSort = () => {
    this.setState({ mobileSideMenuIsOpen: !this.state.mobileSideMenuIsOpen })
  }

  render () {
    return (
      <div className='restaurants'>
        <img src='https://via.placeholder.com/200x200' className='logo-brand' />
        <div className='heading-bar'>
          <button type='button' className='btn btn-primary btn-lg mobile-filter-button' onClick={this.handleMobileFiltersSort}>
            {this.state.mobileSideMenuIsOpen ? 'Done' : 'Filter & Sort'}
          </button>
          <NumberOfResults />
          <div className={[
            'filters-sort',
            this.state.mobileSideMenuIsOpen ? 'filters-sort--open' : ''
          ].join(' ')}>
            <CategoryFilter />
            <Sort />
          </div>
        </div>
        <List />
      </div>
    )
  }
}

export default Restaurants
