import getURLParameters from './getURLParameters'

test('Returns an empty object for an empty string', () => {
  expect(getURLParameters()).toEqual({})
})
