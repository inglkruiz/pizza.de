import getURLParameters from '../index'

test('Returns an empty object when there is not any query parameter', () => {
  expect(getURLParameters()).toEqual({})
  expect(getURLParameters('?')).toEqual({})
})

test('Returns an object with attributes as the query parameters passed', () => {
  const queryObj = getURLParameters('param1=value1&param2=value2&param3=value3')
  expect(queryObj).toMatchSnapshot()
})
