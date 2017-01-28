const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const hmr = process.argv.includes('--hot');

module.exports = {
  entry: {
    app: [
      './assets/js/app.js',
      './assets/sass/app.scss'
    ]
  },
  output: {
    path: hmr ? '/' : 'public',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
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
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
          publicPath: '/'
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([
      { from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap', to: 'fonts' },
      { from: 'node_modules/font-awesome/fonts', to: 'fonts' },
      { from: 'node_modules/slick-carousel/slick/fonts', to: 'fonts' },
      { from: 'node_modules/slick-carousel/slick/ajax-loader.gif', to: 'images' }
    ]),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: production,
      options: {
        postcss: [
          require('autoprefixer')
        ],
        context: __dirname,
        output: { path: './' }
      }
    })
  ],
  performance: {
    hints: false
  },
  devtool: production ? '#source-map' : '#inline-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    compress: true
  }
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
