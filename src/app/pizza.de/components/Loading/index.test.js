import React from 'react'
import { render } from 'react-testing-library'
import Loading from './index'

test('renders', () => {
  const { container } = render(<Loading />)
  expect(container.firstChild).toMatchSnapshot()
})
