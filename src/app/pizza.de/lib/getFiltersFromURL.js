// @flow
import getURLParameters from 'utils/getURLParameters'

const CATEGORY_KEY = 'category'
const SORT_KEY = 'sort'
const filters = [CATEGORY_KEY, SORT_KEY]
let previousQuery

function setFilterParameter(filteringBy: Object, key) {
  const value = filteringBy[key]
  if (value) {
    previousQuery[key] = value
  } else {
    delete previousQuery[key]
  }
}

export function asString(filteringBy: Object): string {
  previousQuery = getURLParameters(window.location.search)

  setFilterParameter(filteringBy, CATEGORY_KEY)
  setFilterParameter(filteringBy, SORT_KEY)

  return Object.keys(previousQuery)
    .map(key => [key, previousQuery[key]].join('='))
    .join('&')
}

export function asObject(): { [string]: string } {
  const queryParameters = getURLParameters(window.location.search)
  const filteringBy = {}

  filters.forEach(key => {
    filteringBy[key] = queryParameters[key] || ''
  })

  return filteringBy
}
