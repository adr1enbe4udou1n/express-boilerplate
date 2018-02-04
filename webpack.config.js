require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const ManifestPlugin = require('webpack-manifest-plugin')

const hmr = process.argv.includes('--hot')
const production = process.env.NODE_ENV === 'production'
const devServerPort = parseInt(process.env.DEV_SERVER_PORT || '8080', 10)

const publicPathFolder = production ? '/dist/' : '/build/'
const publicPath = hmr ? `http://localhost:${devServerPort}${publicPathFolder}` : publicPathFolder

module.exports = {
  entry: {
    app: [
      './assets/js/app.js',
      './assets/sass/app.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public' + publicPathFolder),
    filename: production ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: production,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash]',
              publicPath
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: production
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]',
          publicPath
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new FriendlyErrorsPlugin({
      clearConsole: false
    }),
    new WebpackNotifierPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.includes('node_modules')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: production ? 'css/[name].[contenthash].css' : 'css/[name].css',
      allChunks: false,
      disable: hmr
    }),
    new ManifestPlugin({
      publicPath,
      writeToFileEmit: true
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  devtool: production ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    compress: true,
    noInfo: true,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    port: devServerPort
  }
}

let plugins = []

if (hmr) {
  plugins = [
    new webpack.NamedModulesPlugin()
  ]
}

if (production) {
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

module.exports.plugins.push(...plugins)
