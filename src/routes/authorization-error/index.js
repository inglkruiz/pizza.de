import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/Loading'

const AuthorizationError = Loadable({
  loader: () => import('./Component'),
  loading: () => (<Loading />)
})

export default AuthorizationError
