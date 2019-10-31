import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    teachers: [],
    dropdownPlaceholder: '-- Select Teacher --'
  },
  getters: {
    teachers: state => state.teachers,
    dropdownPlaceholder: state => state.dropdownPlaceholder
  },
  actions: {
    getTeachers({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.teachers).then(res => {
          commit('SET_TEACHERS', res);
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    }
  },
  mutations: {
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    }
  }
}