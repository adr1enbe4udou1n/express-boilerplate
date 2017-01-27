const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const production = process.env.NODE_ENV === 'production';
const hmr = process.argv.includes('--hot');

const extractCSS = new ExtractTextPlugin('public/css/[name].css');

module.exports = {
  entry: {
    app: './assets/js/app.js'
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader',
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap&precision=8'
          ]
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?cacheDirectory'
      },
    ],
  },
  plugins: [
    extractCSS
  ],
};

if (production) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  );
}
