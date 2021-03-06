import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react'
import { withRouter } from 'react-router-dom'

class CategoryFilter extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    filters: PropTypes.shape({
      categories: MobxPropTypes.arrayOrObservableArray
    }),
    filteringBy: PropTypes.shape({
      category: PropTypes.string
    }),
    setFilteringByCategory: PropTypes.func
  }

  handleChange = evt => {
    this.props.history.push(
      `${this.props.location.pathname}?${this.props.setFilteringByCategory(
        evt.target.value
      )}`
    )
  }

  render() {
    const { filters, filteringBy } = this.props
    return (
      <div className="form-group category-filter">
        <select
          id="category"
          className="form-control"
          onChange={this.handleChange}
          value={filteringBy.category}
        >
          <option value="">-- All Categories --</option>
          {filters.categories.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default withRouter(
  inject(allStores => ({
    filters: allStores.main.filters,
    setFilteringByCategory: allStores.main.setFilteringByCategory,
    filteringBy: allStores.main.filteringBy
  }))(observer(CategoryFilter))
)
