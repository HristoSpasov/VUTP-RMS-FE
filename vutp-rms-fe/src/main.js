import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import * as _ from 'lodash'
window._ = _
import conf from './core/conf'
window.conf = conf
window.apis = conf.server.apis
window.api = conf.api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
