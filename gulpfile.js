// generated on 2016-09-16 using generator-webpublic 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const gls = require('gulp-live-server');
const $ = gulpLoadPlugins();

gulp.task('fonts', () => {
  gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .pipe(gulp.dest('public/css/fonts'));

  gulp.src('node_modules/font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .pipe(gulp.dest('public/css/fonts'));

  gulp.src('node_modules/flexslider/fonts/**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .pipe(gulp.dest('public/css/fonts'));
});

gulp.task('styles', () => {
  gulp.src('assets/sass/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', () => {
  gulp.src('assets/js/**/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.webpack({
      output: {
        filename: 'app.js',
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('serve', ['fonts', 'styles', 'scripts'], () => {
  let server = gls.new('bin/www');
  server.start();

  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch(['public/css/**/*.css', 'public/js/**/*.js', 'views/**/*.hbs'], function (file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(['app.js', 'routes/**/*.js', 'views/**/*.hbs'], function(file) {
    server.start.bind(server)();
    server.notify.apply(server, [file]);
  });
});
