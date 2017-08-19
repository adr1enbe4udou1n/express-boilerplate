require('dotenv').config()

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const livereload = require('gulp-livereload')

gulp.task('serve', () => {
  const hmr = process.argv.includes('--hot')

  livereload.listen()

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
        .pipe(livereload())
    })
})
