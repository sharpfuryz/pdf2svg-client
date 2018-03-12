const path = require('path');
module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve('app'),
    filename: '[name].js'
  },
  watch: true,
  devServer: {
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
    ],
  }
}
