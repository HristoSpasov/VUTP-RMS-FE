import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    specialties: []
  },
  getters: {
    getSpecialties: state => state.specialties
  },
  actions: {
    loadSpecialties({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.specialties).then(res => {
          commit('SET_SPECIALTIES', res);
          return resolve(res);
        }, error => {
          return reject(error);
        });
      })
    },
    createSpecialty(_, specialtyInfo) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.specialties + '/create', specialtyInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    updateSpecialty(_, specialtyInfo) {
      return new Promise((resolve, reject) => {
        api.put(conf.server.apis.specialties + '/update', specialtyInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    deleteSpecialty(_, specialtyId) {
      return new Promise((resolve, reject) => {
        api.remove(conf.server.apis.specialties + `/delete/` + specialtyId).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    }
  },
  mutations: {
    SET_SPECIALTIES(state, specialties) {
      state.specialties = specialties;
    }
  }
}