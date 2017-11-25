require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const ManifestPlugin = require('webpack-manifest-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const production = process.env.NODE_ENV === 'production'
const hmr = process.argv.includes('--hot')

const expressPort = parseInt(process.env.PORT || '3000', 10)
const webpackDevServerPort = parseInt(process.env.WEBPACKDEVSERVER_PORT || '5000', 10)
const browserSyncPort = parseInt(process.env.BROWSERSYNC_PORT || '7000', 10)
const browserSyncHost = process.env.BROWSERSYNC_HOST || 'localhost'

module.exports = {
  entry: {
    app: [
      './assets/js/app.js',
      './assets/sass/app.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: production ? 'dist/js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: hmr ? `http://localhost:${webpackDevServerPort}/` : '/'
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
              sourceMap: true,
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer')
              ]
            }
          }, {
            loader: 'resolve-url-loader?sourceMap'
          }, {
            loader: 'sass-loader',
            options: {
              precision: 8,
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
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?cacheDirectory',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory'
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
              publicPath: '/'
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
          name: 'fonts/[name].[ext]?[hash]'
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
    new webpack.LoaderOptionsPlugin({
      minimize: production,
      options: {
        context: __dirname,
        output: { path: './' }
      }
    }),
    new FriendlyErrorsPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new ExtractTextPlugin({
      filename: production ? 'dist/css/[name].[contenthash].css' : 'css/[name].css',
      allChunks: true,
      disable: hmr
    }),
    new BrowserSyncPlugin(
      {
        host: browserSyncHost,
        port: browserSyncPort,
        open: browserSyncHost === 'localhost' ? 'local' : 'external',
        proxy: `http://localhost:${expressPort}/`,
        files: [
          'public/js/**/*.js',
          'public/css/**/*.css'
        ]
      },
      {
        reload: false
      }
    )
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
  devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    contentBase: path.resolve('public'),
    historyApiFallback: true,
    noInfo: true,
    compress: true,
    quiet: true,
    port: webpackDevServerPort
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ManifestPlugin()
  ]
}

module.exports.plugins.push(...plugins)
