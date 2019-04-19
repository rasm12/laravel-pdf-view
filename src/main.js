// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Chart from 'chart.js';
import 'font-awesome/css/font-awesome.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueChartkick from 'vue-chartkick';
import fullCalendar from 'vue-fullcalendar';
import pdf from 'vue-pdf';
import VueSession from 'vue-session';
import swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css";
// register the plugin on vue
import Toasted from 'vue-toasted';
import VueToastr2 from 'vue-toastr-2';
import 'vue-toastr-2/dist/vue-toastr-2.min.css';
import Vuetify from 'vuetify';
import UploadButton from 'vuetify-upload-button';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import { setupComponents } from './config/setup-components';
import router from './router';
import store from './store';
import './styles/global.css';
import Snotify, { SnotifyPosition } from 'vue-snotify'

Vue.use(BootstrapVue)

Vue.use(VueAxios, axios);

window.$ = window.jQuery = require('jquery')


Vue.use(VueSession)


window.toastr = require('toastr')

Vue.use(UploadButton);


Vue.use(VueToastr2)

Vue.use(VueChartkick, { adapter: Chart });
Vue.component('full-calendar', fullCalendar);
Vue.component('swatches', swatches);

setupComponents(Vue);

Vue.use(Vuetify);

Vue.config.productionTip = false

Vue.use(Snotify, {
	toast: {
		timeout: 2000,
		closeOnClick: true
  }
})




Vue.use(Toasted, {
	position: 'bottom-center',
	duration: 3000,
	iconPack: 'material',
	theme:'toasted-primary',
	closeOnSwipe: true,
	singleton: true,
	fullWidth: true,
	fitToScreen: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  components: { App, 'upload-btn': UploadButton, pdf },
  template: '<App/>',
  data: {
    themeColor: '#1D2939',
    userEmail: 'admin@yopmail.com',
    userPassword: '123456'
  }
})
