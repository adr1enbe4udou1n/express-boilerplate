require('./bootstrap');

/**
 * Frontend plugins loading
 */
require('slick-carousel');
window.swal = require('sweetalert2');

/**
 * Example Vue component
 */
Vue.component('about', require('./components/Panel.vue'));

const app = new Vue({
  el: '#app'
});

$('.slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1
});

$('button.sweet').click(function() {
  swal({
    title: 'Yo!',
    text: 'Yeaaah!',
    type: 'success',
    confirmButtonText: 'Cool'
  });
});
