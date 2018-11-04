import 'react-testing-library/cleanup-after-each'
import React from 'react'
import { render } from 'react-testing-library'
import Restaurant from './Component'

test('renders', () => {
  render(<Restaurant />)
})
