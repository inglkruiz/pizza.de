import getURLParameters from '../../../utils/getURLParameters'

const CATEGORY_KEY = 'category'
const SORT_KEY = 'sort'
const filters = [CATEGORY_KEY, SORT_KEY]
let previousQuery

function setFilterParameter (filteringBy, key) {
  const value = filteringBy[key]
  if (value) {
    previousQuery[key] = value
  } else {
    delete previousQuery[key]
  }
}

export function asString (filteringBy) {
  previousQuery = getURLParameters()

  setFilterParameter(filteringBy, CATEGORY_KEY)
  setFilterParameter(filteringBy, SORT_KEY)

  return Object.keys(previousQuery)
    .map(key => [key, previousQuery[key]].join('='))
    .join('&')
}

export function asObject () {
  const queryParameters = getURLParameters()
  const filteringBy = {}

  filters.forEach(key => {
    filteringBy[key] = queryParameters[key] || ''
  })

  return filteringBy
}
