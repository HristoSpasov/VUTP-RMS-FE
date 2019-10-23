import api from '../../core/api'
import conf from '../../core/conf'

export default {
  state: {
    teachers: []
  },
  getters: {
    teachers: state => state.teachers
  },
  actions: {
    async getTeachers({commit}) {
      await api.get(conf.server.apis.teachers).then(res => {
        commit('SET_TEACHERS', res);
      });
    }
  },
  mutations: {
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    }
  }
}