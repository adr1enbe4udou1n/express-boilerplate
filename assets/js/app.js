require('./bootstrap');

/**
 * Frontend plugins loading
 */
require('slick-carousel');
window.swal = require('sweetalert2');

/**
 * Vue loading
 */
import Vue from 'vue';
import Panel from './components/Panel.vue';

/**
 * Example Vue component
 */
Vue.component('about', Panel);

new Vue({
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
  window.swal({
    title: 'Yo!',
    text: 'Yeaaah!',
    type: 'success',
    confirmButtonText: 'Cool'
  });
});
