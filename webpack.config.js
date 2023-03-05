const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [
          path.join(__dirname, './src/emit-loader.js'),
          {
            loader: path.join(__dirname, './src/raw-loader.js'),
            options: {
              name: 'test',
            },
          },
        ]
      }
    ]
  }
}