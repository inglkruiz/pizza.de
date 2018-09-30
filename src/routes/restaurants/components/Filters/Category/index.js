import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

class CategoryFilter extends Component {
  handleChange = (evt) => {
    this.props.history.push(
      `${this.props.location.pathname}?${this.props.setFilteringByCategory(evt.target.value)}`
    )
  }

  render () {
    const { filters, filteringBy } = this.props
    return (
      <div className='form-group category-filter'>
        <select id='category' className='form-control' onChange={this.handleChange} value={filteringBy.category}>
          <option value=''>-- All Categories --</option>
          {
            filters.categories.map(value => (
              <option key={value} value={value}>{value}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

export default withRouter(inject(allStores => ({
  filters: allStores.main.filters,
  setFilteringByCategory: allStores.main.setFilteringByCategory,
  filteringBy: allStores.main.filteringBy
}))(observer(CategoryFilter)))
