const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectLivereload = require('connect-livereload');

const manifest = require('./public/assets-manifest.json');
const routes = require('./routes/web');
const nunjucks = require('nunjucks');

const app = express();
app.locals.development = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'hot';
app.locals.hmr = process.env.NODE_ENV === 'hot';

app.locals.css = {
  app: '/css/app.css'
};
app.locals.js = {
  manifest: '/js/manifest.js',
  vendor: '/js/vendor.js',
  app: '/js/app.js'
};

// specific dev environnement
if (app.locals.development) {
  // livereload for server-side modification
  app.use(connectLivereload());
} else {
  // Production assets
  app.locals.css.app = manifest[app.locals.css.app];
  app.locals.js.manifest = manifest[app.locals.js.manifest];
  app.locals.js.vendor = manifest[app.locals.js.vendor];
  app.locals.js.app = manifest[app.locals.js.app];
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  app.locals.path = req.path;
  next();
});

// load routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
