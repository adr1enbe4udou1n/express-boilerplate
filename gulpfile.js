require('dotenv').config();

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

gulp.task('serve', () => {
  const hmr = process.argv.includes('--hot');

  livereload.listen();

  // start express app
  nodemon({
    script: 'bin/www',
    args: hmr ? ['--hot'] : [],
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

  if (hmr) {
    // start webpack dev server
    const devPort = parseInt(process.env.WEBPACKDEVSERVER_PORT || '5000', 10);

    new WebpackDevServer(compiler, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: true,
      noInfo: true,
      compress: true,
      quiet: true,
      hot: true,
      stats: statsOptions
    }).listen(devPort);

    return;
  }

  // start webpack watcher
  compiler.watch({}, (err, stats) => {
    console.log(stats.toString(statsOptions));
  });
});
