import React from 'react'
import Loadable from 'react-loadable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../../Loading'
import style from '../style-base.module.scss'

const Restaurant = Loadable({
  loader: () => import('../Component'),
  loading: function RestaurantLoading() {
    return <Loading />
  }
})

export default function RestaurantAsBlock(props) {
  return (
    <div className={style.restaurant}>
      <Restaurant {...props}>
        <button
          className={[style.restaurant__cta, 'btn btn-primary btn-lg'].join(
            ' '
          )}
        >
          <FontAwesomeIcon icon="phone" /> Call Now
        </button>
      </Restaurant>
    </div>
  )
}
