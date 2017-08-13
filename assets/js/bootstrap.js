window._ = require('lodash');

/**
 * jQuery and Bootstrap loading
 */
window.$ = window.jQuery = require('jquery');
import Popper from 'popper.js';
window.Popper = Popper;
require('bootstrap');

/**
 * Axios loading
 */
window.axios = require('axios');
