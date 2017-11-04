module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.'
  }
}
