const path = require('path')

const context = path.resolve(__dirname, '../..')
const dist = path.join(context, 'public')
const src = path.join(context, 'src')
const dll = path.join(dist, 'dll')

module.exports = {
  dist,
  src,
  context,
  dll
}
