const path = require('path')
const MyPlugin = require('./plugins/my-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: []
  },
  plugins: [
    new MyPlugin({
      name: 'my plugin'
    })
  ]
}