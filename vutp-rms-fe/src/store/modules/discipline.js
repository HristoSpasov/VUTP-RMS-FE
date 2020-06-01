import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    disciplines: []
  },
  getters: {
    getDisciplines: state => state.disciplines
  },
  actions: {
    loadDisciplines({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.disciplines).then(res => {
          commit('SET_DISCIPLINES', res);
          return resolve(res);
        }, error => {
          return reject(error);
        });
      })
    },
    createDiscipline(_, disciplineInfo) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.disciplines + '/create', disciplineInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    updateDiscipline(_, disciplineInfo) {
      return new Promise((resolve, reject) => {
        api.put(conf.server.apis.disciplines + '/update', disciplineInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    deleteDiscipline(_, disciplineId) {
      return new Promise((resolve, reject) => {
        api.remove(conf.server.apis.disciplines + `/delete/` + disciplineId).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    validateDisciplineName(_, name) {
        return new Promise((resolve, reject) => {
          api.post(conf.server.apis.disciplines + `/validatedisciplinename/${name}`).then(res => {
            return resolve(res);
          }, error => {
            return reject(error)
          });
        });
      },
  },
  mutations: {
    SET_DISCIPLINES(state, disciplines) {
      state.disciplines = disciplines;
    }
  }
}