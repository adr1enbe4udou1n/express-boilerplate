var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { currentRoute: 'index', message: {
    body: 'Yeaaah!',
    type: 'success'
  }});
});

/* Contact about page. */
router.get('/about', function(req, res, next) {
  res.render('pages/about', { currentRoute: 'about' });
});

/* Contact contact page. */
router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { currentRoute: 'contact', message: {
    body: 'Enter a valid email address',
    type: 'danger'
  }});
});

module.exports = router;
