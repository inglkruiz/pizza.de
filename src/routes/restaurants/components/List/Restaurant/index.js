import React from 'react'

import './style'

function Restaurant ({
  id,
  logo,
  name,
  averageRating,
  location,
  categories,
  shown
}) {
  if (!shown) return null

  return (
    <a className='restaurant' href='javascript:void(0)'>
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
      <button className='btn btn-primary btn-lg restaurant__cta'>
        Order Now
      </button>
    </a>
  )
}

export default Restaurant
