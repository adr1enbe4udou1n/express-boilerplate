require('dotenv').config();

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

gulp.task('serve', () => {
  livereload.listen();

  // start express app
  nodemon({
    script: 'bin/www',
    ext: 'js nunjucks',
    ignore: [
      'assets/',
      'public/',
      'node_modules/'
    ],
    env: { NODE_ENV: process.env.NODE_ENV }
  })
  .on('restart', () => {
    gulp
      .src('bin/www')
      .pipe(livereload());
  });

  const compiler = webpack(webpackConfig);
  const statsOptions = {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  };

  if (process.env.NODE_ENV === 'development') {
    // start webpack watcher
    compiler.watch({}, (err, stats) => {
      console.log(stats.toString(statsOptions));
    });

    return;
  }

  // start webpack dev server
  const expressPort = parseInt(process.env.PORT || '3000', 10);
  const devPort = parseInt(process.env.WEBPACKDEVSERVER_PORT || '5000', 10);
  const browserSyncHost = process.env.BROWSERSYNC_HOST || 'localhost';

  new WebpackDevServer(compiler, {
    historyApiFallback: true,
    noInfo: false,
    compress: true,
    hot: true,
    publicPath: compiler.options.output.publicPath,
    proxy: {
      '/': `http://localhost:${expressPort}`
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: statsOptions,
    public: browserSyncHost
  }).listen(devPort);
});
