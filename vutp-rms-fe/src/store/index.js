import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/room'
import specialties from './modules/specialty'
import teachers from './modules/teacher'
import common from './modules/common'
import auth from './modules/auth'
import disciplines from './modules/discipline'
import events from './modules/event'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    rooms,
    specialties,
    teachers,
    common,
    auth,
    disciplines,
    events
  }
})
