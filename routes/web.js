const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pages/home', { message: {
    body: 'Yeaaah!',
    type: 'success',
  } });
});

/* Contact about page. */
router.get('/about', (req, res) => {
  res.render('pages/about');
});

/* Contact contact page. */
router.get('/contact', (req, res) => {
  res.render('pages/contact', { message: {
    body: 'Enter a valid email address',
    type: 'danger',
  } });
});

module.exports = router;
