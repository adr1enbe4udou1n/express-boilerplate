require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const production = process.env.NODE_ENV === 'production';
const hmr = process.env.HMR_ENV !== undefined;
const port = parseInt(process.env.DEV_PORT, 10);

module.exports = {
  entry: {
    app: [
      './assets/js/app.js',
      './assets/sass/app.scss'
    ]
  },
  output: {
    path: __dirname + '/public',
    filename: production ? 'dist/js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: hmr ? `http://localhost:${port}/` : '/'
  },
  module: {
    rules: [
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
            require('autoprefixer')
          ]
        }
      },
      {
        test: /\.jsx?$/,
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
    ]
  },
  plugins: [
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
    }),
    new WebpackNotifierPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.vue'],

    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  performance: {
    hints: false
  },
  devtool: production ? '#source-map' : '#inline-source-map'
};

if (production) {
  module.exports.module.rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        'css-loader',
        'postcss-loader',
        'resolve-url-loader',
        'sass-loader?sourceMap&precision=8'
      ]
    })
  });

  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist'], {
      root: __dirname + '/public'
    }),
    new ExtractTextPlugin('dist/css/[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new StatsWriterPlugin({
      filename: "assets-manifest.json",
      transform: function (data, opts) {
        return JSON.stringify({
          js: data.assetsByChunkName.app[0],
          css: data.assetsByChunkName.app[1]
        }, null, 2);
      }
    })
  ]);
}
else {
  module.exports.module.rules.push({
    test: /\.scss$/,
    loader: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'resolve-url-loader',
      'sass-loader?sourceMap&precision=8'
    ]
  });

  if (hmr) {
    switch(process.env.HMR_ENV) {
      case 'dev':
        module.exports.entry.app.push(
          `webpack-dev-server/client?http://localhost:${port}/`
        );
        break;
      case 'hot':
        module.exports.entry.app.push(
          `webpack-hot-middleware/client`
        );
        break;
    }

    module.exports.entry.app.push('webpack/hot/dev-server');

    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]);
  }
}
