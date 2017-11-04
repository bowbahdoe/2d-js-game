const { resolve } = require('path')
const {
  TsConfigPathsPlugin
} = require('awesome-typescript-loader')
const SRC = resolve(__dirname, 'src/')
const PUBLIC = resolve(__dirname, 'public/')

module.exports = {
  entry: resolve(SRC, 'index.ts'),
  devtool: 'source-map',
  output: {
    path: PUBLIC,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
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
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
