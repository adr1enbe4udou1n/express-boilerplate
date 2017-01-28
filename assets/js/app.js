window._ = require('lodash');

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

require('slick-carousel');
window.swal = require('sweetalert2');

if (module.hot) {
  module.hot.accept();
}
