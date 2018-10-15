import React from 'react'
import { Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../Loading'

const Restaurant = Loadable({
  loader: () => import('./Component'),
  loading: () => <Loading />
})

export function RestaurantAsLink (props) {
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
