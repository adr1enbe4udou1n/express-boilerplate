const gulp = require('gulp');
const gls = require('gulp-live-server');

const statsOptions = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false
}

const browserSync = require('browser-sync').create();
const webpackDevServer = require('webpack-dev-server');

require('dotenv').config();
const expressPort = parseInt(process.env.PORT, 10);
const webpackDevServerPort = parseInt(process.env.WEBPACKDEVSERVER_PORT, 10);
const browserSyncPort = parseInt(process.env.BROWSERSYNC_PORT, 10);

function getCompiler() {
  const config = require('./webpack.config.js');
  return require('webpack')(config);
}

gulp.task('dev', () => {
  process.env.NODE_ENV = 'developement';
  
  getCompiler().run((err, stats) => {
    console.log(stats.toString(statsOptions));
  });
});

gulp.task('watch', () => {
  process.env.NODE_ENV = 'developement';

  getCompiler().watch({
    
  }, (err, stats) => {
    console.log(stats.toString(statsOptions));
  });
});

gulp.task('production', () => {
  process.env.NODE_ENV = 'production';

  getCompiler().run((err, stats) => {
    console.log(stats.toString(statsOptions));
  });
});

function serve() {
  process.env.NODE_ENV = 'developement';
  const useHotModuleReplacement = process.argv.includes('--hmr');
  const useBrowserSync = process.argv.includes('--bs');

  // start express app
  let server = gls.new('bin/www');
  server.start();

  // watcher for livereloading express server and browser
  gulp.watch(['app.js', 'routes/**/*', 'views/**/*', 'public/**/*'], function(file) {
    server.start.bind(server)();
    server.notify.apply(server, [file]);
  });

  if (useHotModuleReplacement) {
    // start webpack dev server with hmr
    const compiler = getCompiler();
    new webpackDevServer(compiler, {
      historyApiFallback: true,
      noInfo: false,
      compress: true,
      hot: true,
      publicPath: compiler.options.output.publicPath,
      proxy: {
        '/': `http://localhost:${expressPort}`
      },
      stats: statsOptions
    }).listen(webpackDevServerPort);
  }
  else {
    getCompiler().watch({
      
    }, (err, stats) => {
      console.log(stats.toString(statsOptions));
    });
  }

  if (useBrowserSync) {
    // start browser init
    const targetPort = useHotModuleReplacement ? webpackDevServerPort : expressPort;

    browserSync.init({
      proxy: `localhost:${targetPort}`,
      port: browserSyncPort
    });
  }
}

gulp.task('serve', () => {
  serve();
});

gulp.task('hmr', () => {
  process.argv.push('--hmr');
  serve();
});

gulp.task('bs', () => {
  process.argv.push('--bs');
  serve();
});

gulp.task('full', () => {
  process.argv.push('--hmr', '--bs');
  serve();
});
