import api from '../../core/api'
import conf from '../../core/conf'

export default {
  state: {
    specialties: []
  },
  getters: {
    rooms: state => state.specialties
  },
  actions: {
    async getSpecialties({commit}) {
      await api.get(conf.server.apis.specialties).then(res => {
        commit('SET_SPECIALTIES', res);
      });
    }
  },
  mutations: {
    SET_SPECIALTIES(state, specialties) {
      state.specialties = specialties;
    }
  }
}