import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../../../components/Loading'

const Menu = Loadable({
  loader: () => import('./Body'),
  loading: () => (<Loading />)
})

export default Menu
