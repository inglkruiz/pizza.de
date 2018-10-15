const path = require('path')

const context = path.resolve(__dirname, '../..')
const dist = path.join(context, 'public')
const dll = path.join(dist, 'dll')
const src = path.join(context, 'src')
const app = path.join(src, 'app')

module.exports = {
  dist,
  dll,
  src,
  app,
  context
}
