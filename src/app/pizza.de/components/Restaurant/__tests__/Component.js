import React from 'react'
import { render } from 'react-testing-library'
import Restaurant from '../Component'

test('renders', () => {
  const { container } = render(
    <Restaurant
      id="10317"
      name="Krishna"
      logo="https://static-files.pizza.de/media/restaurant_logos/8a9957c0206469375baad3a2a5d7d29562424d1c_200.png"
      location="Dumy Address 14 - Berlin, DE"
      averageRating={4.8}
      categories={['burger', 'vegetarisch']}
    />
  )
  expect(container).toMatchSnapshot()
})
