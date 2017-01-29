const gulp = require('gulp');
const gls = require('gulp-live-server');

gulp.task('serve', () => {
  let args = ['bin/www'];

  if (process.argv.includes('--hot')) {
    args.push('--hot');
  }

  let server = gls.new(args);
  server.start();

  gulp.watch(['app.js', 'routes/**/*', 'views/**/*', 'public/**/*'], function(file) {
    server.start.bind(server)();
    server.notify.apply(server, [file]);
  });
});
