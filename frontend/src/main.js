import 'font-awesome/css/font-awesome.css'
import Vue from 'vue';

import './config/bootstrap'
import App from './App';
import store from './config/store';
import router from './config/router'

Vue.config.productionTip = false;

//TEMPORARIO 
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ildlc2xleSBMZW9uY2lvIERhIENydXoiLCJlbWFpbCI6Indlc2xleUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjI5NDg2OTUxLCJleHAiOjE2Mjk3NDYxNTF9.67AevQsZNn3yWD4yH_vFfTZY7myfz02O69NJpM-Yc50';


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')