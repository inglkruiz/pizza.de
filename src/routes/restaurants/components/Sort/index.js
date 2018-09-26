import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

export const RATING_KEY = 'rating'

class RatingSort extends Component {
  handleChange = (evt) => {
    this.props.history.push(
      `${this.props.location.pathname}?${this.props.setFilterinBySort(evt.target.value)}`
    )
  }

  render () {
    return (
      <div className='form-group'>
        <select id='category' className='form-control' onChange={this.handleChange} value={this.props.filteringBy.sort}>
          <option value=''>-- Sort By --</option>
          <option value={RATING_KEY}>Avg. Rating</option>
        </select>
      </div>
    )
  }
}

export default withRouter(inject(allStores => ({
  setFilterinBySort: allStores.main.setFilterinBySort,
  filteringBy: allStores.main.filteringBy
}))(observer(RatingSort)))
