import React, { Fragment, PureComponent } from 'react'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'

import style from './style.module.scss'

export const RestaurantProps = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  categories: MobxPropTypes.arrayOrObservableArray,
  children: PropTypes.node
}

class Restaurant extends PureComponent {
  static propTypes = RestaurantProps

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
        <img className={style.restaurant__logo} src={logo} />
        <div className={style.restaurant__info}>
          <h4 className={style.restaurant__name}>{name}</h4>
          <span className={style['restaurant__average-rating']}>
            Avg. Rating ({averageRating}
            /5)
          </span>
          <address className={style.restaurant__location}>
            Location: {location}
          </address>
          <div>
            {categories.length &&
              categories.map((cat, i) => (
                <span
                  key={`${id}_cat_${i}`}
                  className={style.restaurant__category}
                >
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
