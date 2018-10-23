import React, { Fragment, PureComponent } from 'react'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'

import './style'

if (!BUNDLING_PRODUCTION) {
  import('./style-tablet')
  import('./style-desktop')
}

if (BUNDLING_PRODUCTION && window.innerWidth >= 768) {
  import('./style-tablet')
}

if (BUNDLING_PRODUCTION && window.innerWidth >= 992) {
  import('./style-desktop')
}

class Restaurant extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    logo: PropTypes.string,
    name: PropTypes.string,
    averageRating: PropTypes.number,
    location: PropTypes.string,
    categories: MobxPropTypes.arrayOrObservableArray,
    children: PropTypes.node
  }

  static defaultProps = {
    categories: []
  }

  render() {
    const {
      id,
      logo,
      name,
      averageRating,
      location,
      categories,
      children
    } = this.props
    return (
      <Fragment>
        <img className="restaurant__logo" src={logo} />
        <div className="restaurant__info">
          <h4 className="restaurant__name">{name}</h4>
          <span className="restaurant__average-rating">
            Avg. Rating ({averageRating}
            /5)
          </span>
          <address className="restaurant__location">
            Location: {location}
          </address>
          <div>
            {categories.length &&
              categories.map((cat, i) => (
                <span key={`${id}_cat_${i}`} className="restaurant__category">
                  {cat}
                </span>
              ))}
          </div>
        </div>
        {children}
      </Fragment>
    )
  }
}

export default Restaurant
