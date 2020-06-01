import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import './assets/sass/main.scss'
import { Settings } from 'luxon'

Settings.defaultLocale = 'bg'

import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect)

Vue.use(Datetime)
Vue.config.productionTip = false

import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
 
Vue.use(Notifications, { velocity })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
