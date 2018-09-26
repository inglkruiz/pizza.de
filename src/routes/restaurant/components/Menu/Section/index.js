import React from 'react'
import Loadable from 'react-loadable'

import Loading from '../../../../../components/Loading'

const Section = Loadable({
  loader: () => import('./Component'),
  loading: () => (<Loading />)
})

export default Section
