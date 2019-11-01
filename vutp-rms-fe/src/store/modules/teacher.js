import api from '../../core/api'
import conf from '../../core/conf'
import _ from 'lodash';

export default {
  strict: true,
  namespaced: true,
  state: {
    teachers: [],
    selectedTeacher: {},
    dropdownPlaceholder: '-- Select Teacher --'
  },
  getters: {
    getTeachers: state => state.teachers,
    getSelectedTeacher: state => state.selectedTeacher,
    getSelectedTeacherInfo: state => state.selectedTeacher ? `${ state.selectedTeacher.academicTitle} - ${ state.selectedTeacher.firstName} ${ state.selectedTeacher.lastName}` : 'No teacher selected.',
    getDropdownPlaceholder: state => state.dropdownPlaceholder
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
    },
    loadTeacherInfoById({state}, teacherId) {
      return new Promise((resolve) => {
        let teacher = _.find(state.teachers, teacher => {
          return teacher.id === teacherId;
        })
        
        let teacherInfo =  teacher ? `${ teacher.academicTitle} - ${ teacher.firstName} ${ teacher.lastName}` : 'No teacher info!';
  
        resolve(teacherInfo);
      })
    }
  },
  mutations: {
    SET_TEACHERS(state, teachers) {
      state.teachers = teachers;
    },
    SET_SELECTED_TEACHER(state, teacherId)
    {
      debugger;
      let selectedTeacher = _.find(state.teachers, teacher => {
        debugger
        return teacher.id === teacherId;
      })

      if (selectedTeacher) {
        state.selectedTeacher = selectedTeacher;
      }
    }
  }
}