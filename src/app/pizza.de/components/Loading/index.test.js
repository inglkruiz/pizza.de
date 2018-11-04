import 'react-testing-library/cleanup-after-each'
import React from 'react'
import { render } from 'react-testing-library'
import Loading from './index'

test('renders', () => {
  render(<Loading />)
})
