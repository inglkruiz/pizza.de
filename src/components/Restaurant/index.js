import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import './style'

export function RestaurantAsLink (props) {
  if (!props.shown) return null

  return (
    <Link className='restaurant' to={`/restaurant/${props.id}`}>
      <Restaurant {...props}>
        <button className='btn btn-primary btn-lg restaurant__cta'>
          Order Now <i className='icon-angle-right' />
        </button>
      </Restaurant>
    </Link>
  )
}

export function RestaurantAsBlock (props) {
  return (
    <div className='restaurant'>
      <Restaurant {...props}>
        <button className='btn btn-primary btn-lg restaurant__cta'>
          <i className='icon-phone' /> Call Now
        </button>
      </Restaurant>
    </div>
  )
}

function Restaurant ({
  id,
  logo,
  name,
  averageRating,
  location,
  categories,
  shown,
  children
}) {
  return (
    <Fragment>
      <img className='restaurant__logo' src={logo} />
      <div className='restaurant__info'>
        <h4 className='restaurant__name'>{name}</h4>
        <span className='restaurant__average-rating'>
          Avg. Rating ({averageRating}/5)
        </span>
        <address className='restaurant__location'>
          Location: {location}
        </address>
        <div>
          {
            categories.map((cat, i) => (
              <span key={`${id}_cat_${i}`} className='restaurant__category'>
                {cat}
              </span>
            ))
          }
        </div>
      </div>
      {children}
    </Fragment>
  )
}
