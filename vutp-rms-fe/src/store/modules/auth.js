import api from '../../core/api'
import conf from '../../core/conf'

const authState = JSON.parse(localStorage.getItem('auth-info'));

export default {
  strict: true,
  namespaced: true,
  state: {
    authInfo: authState || null
  },
  getters: {
    isAuthenticated: state => state.authInfo,
    isAdmin: state => state.authInfo.roles.includes("Admin"),
    getToken: state => state.authInfo.auth_token,
    getUserId: state => state.authInfo.id,
  },
  actions: {
    login({commit}, credentials) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.accounts + '/login', credentials).then(res => {
          localStorage.setItem('auth-info', res)
          commit('SET_AUTH_INFO', res);
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    register(_, user) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.accounts + '/register', user).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    validateEmailAddress(_, email) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.accounts + `/validateemailaddress/${email}`).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    validateUserName(_, userName) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.accounts + `/validateusername/${userName}`).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    logout({commit}) {
      localStorage.removeItem('auth-info')
      commit('SET_AUTH_INFO', null);
    }
  },
  mutations: {
    SET_AUTH_INFO(state, authInfo) {
      state.authInfo = JSON.parse(authInfo);
    }
  }
}
