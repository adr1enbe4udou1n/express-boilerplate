require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const ManifestPlugin = require('webpack-manifest-plugin')

const hmr = process.argv.includes('--hot')
const production = process.env.NODE_ENV === 'production'
const devServerPort = parseInt(process.env.DEV_SERVER_PORT || '8080', 10)

const publicPathFolder = production ? '/dist/' : '/build/'
const publicPath = hmr ? `http://localhost:${devServerPort}${publicPathFolder}` : publicPathFolder

let cssLoaders = [
  production ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
      minimize: production,
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: true
    }
  }
]

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
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.scss$/,
        use: cssLoaders.concat([
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ])
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
              name: 'images/[name].[ext]?[hash]'
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules.*\.js$/,
          name: `vendor`,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackNotifierPlugin(),
    new MiniCssExtractPlugin({
      filename: production ? 'css/[name].[chunkhash].css' : 'css/[name].css'
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
