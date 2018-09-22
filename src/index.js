import '@babel/polyfill'
import React from 'react'
import {render} from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'

import mainStore from './Store'

import './style'
render(
  <Provider main={mainStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
