import React from 'react'
import { Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Restaurant = Loadable({
  loader: () => import('../Component'),
  loading: () => <Loading />
})

export default function RestaurantAsLink (props) {
  return (
    <Link className='restaurant' to={`/restaurant/${props.id}`}>
      <Restaurant {...props}>
        <button className='btn btn-primary btn-lg restaurant__cta'>
          Order Now <FontAwesomeIcon icon='angle-right' />
        </button>
      </Restaurant>
    </Link>
  )
}
