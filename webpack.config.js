const { resolve } = require('path')
const {
  TsConfigPathsPlugin
} = require('awesome-typescript-loader')
const SRC = resolve(__dirname, 'src/')
const PUBLIC = resolve(__dirname, 'public/')

module.exports = {
  entry: resolve(SRC, 'index.ts'),
  output: {
    path: PUBLIC,
    filename: 'bundle.js'
  },
  plugins: [
    new TsConfigPathsPlugin({
      configFileName: 'tsconfig.json'
    })
  ],
  module: {
    rules: [
      {
       test: /\.tsx?$/,
       loader: 'awesome-typescript-loader'
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
