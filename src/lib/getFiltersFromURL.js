import getURLParameters from '../utils/getURLParameters'

let previousQuery

/* function setParameterByRange (filters, key) {
  const filter = filters[key]

  if (filter && (filter.min !== filter.from || filter.max !== filter.to)) {
    previousQuery[key] = `${filter.from || filter.min},${
      filter.to < filter.max ? filter.to : filter.max
    }`
  } else if (typeof previousQuery[key] !== 'undefined') {
    delete previousQuery[key]
  }
} */

/* function setParameterByCheckbox (filters, key) {
  const filter = filters[key]
  const selected = []

  for (let key in filter) {
    if (filter[key].checked) {
      selected.push(filter[key].slug)
    }
  }

  if (selected.length > 0) {
    previousQuery[key] = selected.join(',')
  } else if (typeof previousQuery[key] !== 'undefined') {
    delete previousQuery[key]
  }
} */

function setFilterParameter (filteringBy, key) {
  const value = filteringBy[key]
  if (value) {
    previousQuery[key] = value
  } else {
    delete previousQuery[key]
  }
}

export default function getFiltersFromURL (filteringBy) {
  previousQuery = getURLParameters()

  setFilterParameter(filteringBy, 'category')
  // setParameterByRange(filters, 'price')
  // setParameterByRange(filters, 'deductible')
  // setParameterByRange(filters, 'moop')
  // setParameterByCheckbox(filters, 'carrier')
  // setParameterByCheckbox(filters, 'metal')
  // setParameterByCheckbox(filters, 'type')

  setFilterParameter(filteringBy, 'sort')

  return Object.keys(previousQuery)
    .map(key => [key, previousQuery[key]].join('='))
    .join('&')
}
