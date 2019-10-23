import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/room'
import specialties from './modules/specialty'
import teachers from './modules/teacher'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    rooms,
    specialties,
    teachers
  }
})
