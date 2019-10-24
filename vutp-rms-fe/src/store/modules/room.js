import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    rooms: []
  },
  getters: {
    rooms: state => state.rooms
  },
  actions: {
    getRooms({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.rooms).then(res => {
          commit('SET_ROOMS', res);
          resolve(res)
        }, error => {
          reject(error)
        });
      })
    }
  },
  mutations: {
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    }
  }
}