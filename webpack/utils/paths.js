const path = require('path')

const context = path.resolve(__dirname, '../..')
const dist = path.join(context, 'public')
const src = path.join(context, 'src')

module.exports = {
  dist,
  src,
  context
}
