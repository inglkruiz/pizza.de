// @flow
/**
 * Transforms a URL query string to an object
 * @param {String} queryString URL query parameters
 * @returns {Object}
 */
export default function getURLParameters(
  queryString: string = ''
): { [string]: string } {
  const paramsObject = {}
  queryString = queryString.replace(/^\?/, '')

  if (!queryString) return paramsObject

  const dataURL = queryString.split('&')
  let data, keyValue, key

  for (data of dataURL) {
    keyValue = data.split('=')
    key = keyValue[0]

    if (key) {
      paramsObject[key.toLowerCase()] = decodeURIComponent(keyValue[1])
    }
  }

  return paramsObject
}
