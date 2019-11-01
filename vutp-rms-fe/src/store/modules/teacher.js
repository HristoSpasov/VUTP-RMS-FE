import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    teachers: [],
    selectedTeacher: {}
  },
  getters: {
    getTeachers: state => state.teachers,
    getSelectedTeacher: state => state.selectedTeacher
  },
  actions: {
    loadTeachers({commit}) {
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
    },
    SET_SELECTED_TEACHER(state, teacher)
    {
      state.selectedTeacher = teacher;
    }
  }
}