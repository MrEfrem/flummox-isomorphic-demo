'use strict';

var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    './public/css/app.css',
    './src/client/app'
  ],
  output: {
    path: './public/js/',
    filename: 'app.js',
    publicPath: 'http://localhost:8081/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.css/, loader: 'style-loader!css-loader' }
    ]
  },
  devServer: {
    contentBase: './public/',
    hot: true,
    inline: true,
    port: 8081
  }
};
