import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Restaurant = Loadable({
  loader: () => import('../Component'),
  loading: function RestaurantLoading() {
    return <Loading />
  }
})

export default function RestaurantAsBlock(props) {
  return (
    <div className="restaurant">
      <Restaurant {...props}>
        <button className="btn btn-primary btn-lg restaurant__cta">
          <FontAwesomeIcon icon="phone" /> Call Now
        </button>
      </Restaurant>
    </div>
  )
}
