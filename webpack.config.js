module.exports = {
  entry: {
    main: './src/index.js',
    playground: './src/playground.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.'
  }
}
