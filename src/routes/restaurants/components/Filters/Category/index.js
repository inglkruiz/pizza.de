import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

export const CATEGORY_KEY = 'CATEGORY'

class CategoryFilter extends Component {
  handleChange = (evt) => {
    this.props.history.push(
      `${this.props.location.pathname}?${this.props.filter(CATEGORY_KEY, evt.target.value)}`
    )
  }

  render () {
    return (
      <div className='form-group'>
        <select id='category' className='form-control' onChange={this.handleChange}>
          <option value=''>-- All Categories --</option>
          {
            this.props.filters.categories.map(value => (
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
  filter: allStores.main.filter
}))(observer(CategoryFilter)))
