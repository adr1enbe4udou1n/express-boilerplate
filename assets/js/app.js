require('./bootstrap');

/**
 * Frontend plugins loading
 */
require('slick-carousel');
window.swal = require('sweetalert2');

/**
 * Example Vue component
 */
Vue.component('about', require('./components/About.vue'));

const app = new Vue({
  el: '#app'
});

/**
 * Hot reloading
 */
if (module.hot) {
  module.hot.accept();
}
