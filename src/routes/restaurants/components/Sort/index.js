import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

export const RATING_KEY = 'RATING'

class RatingSort extends Component {
  handleChange = (evt) => {
    this.props.history.push(
      `${this.props.location.pathname}?${this.props.sort(evt.target.value)}`
    )
  }

  render () {
    return (
      <div className='form-group'>
        <select id='category' className='form-control' onChange={this.handleChange}>
          <option value=''>-- Sort By --</option>
          <option value={RATING_KEY}>Avg. Rating</option>
        </select>
      </div>
    )
  }
}

export default withRouter(inject(allStores => ({
  sort: allStores.main.sort
}))(observer(RatingSort)))
