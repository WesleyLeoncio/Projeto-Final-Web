import 'font-awesome/css/font-awesome.css'
import Vue from 'vue';

import './config/bootstrap'
import './config/msgs'
import App from './App';
import store from './config/store';
import router from './config/router'

Vue.config.productionTip = false;

//TEMPORARIO 
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ildlc2xleSBMZW9uY2lvIERhIENydXoiLCJlbWFpbCI6Indlc2xleUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMyNTEwNzcyLCJleHAiOjE2NzM5ODI3NzJ9.8yPB2sJukg7gfSU1msizu53XCsNlli1IekoUTDQuIzc';


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')