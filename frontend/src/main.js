import 'font-awesome/css/font-awesome.css'
import Vue from 'vue';

import './config/bootstrap'
import App from './App';
import store from './config/store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')