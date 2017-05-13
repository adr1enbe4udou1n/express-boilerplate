require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV === 'production';
const hmr = process.env.NODE_ENV === 'hot';

const expressPort = parseInt(process.env.PORT || '3000', 10);
const webpackDevServerPort = parseInt(process.env.WEBPACKDEVSERVER_PORT || '5000', 10);
const browserSyncPort = parseInt(process.env.BROWSERSYNC_PORT || '7000', 10);
const browserSyncHost = process.env.BROWSERSYNC_HOST || 'localhost';

const extractSass = new ExtractTextPlugin({
  filename: production ? 'dist/css/[name].[contenthash].css' : 'css/[name].css',
  disable: hmr
});

const sassSourceMap = production || (process.env.SASS_SOURCE_MAP || false);

module.exports = {
  entry: {
    app: [
      './assets/js/app.js',
      './assets/sass/app.scss'
    ],
    vendor: [
      'lodash',
      'jquery',
      'vue',
      'axios',
      'sweetalert2',
      'slick-carousel'
    ]
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: production ? 'dist/js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: hmr ? `http://${browserSyncHost}:${webpackDevServerPort}/` : '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: sassSourceMap
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: sassSourceMap
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: sassSourceMap
            }
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?cacheDirectory',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          },

          postcss: [
            autoprefixer
          ]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
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
          'img-loader'
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
    new FriendlyErrorsWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: production,
      options: {
        postcss: [
          autoprefixer
        ],
        context: __dirname,
        output: { path: './' }
      }
    }),
    new WebpackNotifierPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    extractSass,
    new BrowserSyncPlugin(
      {
        host: browserSyncHost,
        port: browserSyncPort,
        open: browserSyncHost === 'localhost' ? 'local' : 'external',
        proxy: `http://${browserSyncHost}:${hmr ? webpackDevServerPort : expressPort}/`,
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
    extensions: ['*', '.js', '.jsx', '.vue'],

    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  performance: {
    hints: false
  },
  devtool: production ? 'source-map' : 'inline-source-map'
};

let plugins = [];

if (hmr) {
  module.exports.entry.app.push(
    `webpack-dev-server/client?http://${browserSyncHost}:${webpackDevServerPort}/`,
    'webpack/hot/dev-server'
  );

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ];
}

if (production) {
  plugins = [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '/public')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new StatsWriterPlugin({
      filename: 'assets-manifest.json',
      transform(data) {
        return JSON.stringify({
          '/js/manifest.js': data.assetsByChunkName.manifest[0],
          '/js/vendor.js': data.assetsByChunkName.vendor[0],
          '/js/app.js': data.assetsByChunkName.app[0],
          '/css/app.css': data.assetsByChunkName.app[1]
        }, null, 2);
      }
    })
  ];
}

module.exports.plugins.push(...plugins);
