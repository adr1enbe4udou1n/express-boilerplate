import './bootstrap'

/**
 * Frontend plugins loading
 */
import 'slick-carousel'
import sweetalert2 from 'sweetalert2'
import Vue from 'vue'
import Panel from './components/Panel.vue'

window.swal = sweetalert2

/**
 * Example Vue component
 */
Vue.component('about', Panel)

new Vue().$mount('#app');

(function ($) {
  $('.slider').not('.slick-initialized').removeAttr('hidden').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1
  })

  $('button.sweet').click(() => {
    window.swal({
      title: 'Yo!',
      text: 'Yeaaah!',
      type: 'success',
      confirmButtonText: 'Cool'
    })
  })
})(window.jQuery)
