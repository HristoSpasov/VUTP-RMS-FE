import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    specialties: []
  },
  getters: {
    rooms: state => state.specialties
  },
  actions: {
    getSpecialties({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.specialties).then(res => {
          commit('SET_SPECIALTIES', res);
          return resolve(res);
        }, error => {
          return reject(error);
        });
      })
    }
  },
  mutations: {
    SET_SPECIALTIES(state, specialties) {
      state.specialties = specialties;
    }
  }
}