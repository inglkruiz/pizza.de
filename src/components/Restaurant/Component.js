import React, { Fragment } from 'react'

import './style'

export default function Restaurant ({
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
