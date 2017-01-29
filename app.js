let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let hbsInit = require('./hbs');

let routes = require('./routes/web');

let app = express();
app.locals.production = process.env.NODE_ENV === 'production';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbsInit(app);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  app.locals.path = req.path;
  next();
});

// specific dev environnement
if (!app.locals.production) {
  app.locals.hot = process.argv.includes('--hot');

  // livereload for server-side modification
  app.use(require('connect-livereload')());
  let livereload = require('livereload');
  let server = livereload.createServer();
  server.watch([__dirname + '/routes', __dirname + '/views']);

  if (app.locals.hot) {
    // load webpack middleware
    let config = require('./webpack.config.js');
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));

    app.use(require('webpack-hot-middleware')(compiler));
  }
}

// load routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
