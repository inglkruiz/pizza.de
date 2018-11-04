import React from 'react'
import { Link } from 'react-router-dom'
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

export default function RestaurantAsLink(props) {
  return (
    <Link className={style.restaurant} to={`/restaurant/${props.id}`}>
      <Restaurant {...props}>
        <button
          className={[style.restaurant__cta, 'btn btn-primary btn-lg'].join(
            ' '
          )}
        >
          Order Now <FontAwesomeIcon icon="angle-right" />
        </button>
      </Restaurant>
    </Link>
  )
}
