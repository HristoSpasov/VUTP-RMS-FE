import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    rooms: []
  },
  getters: {
    getRooms: state => state.rooms
  },
  actions: {
    loadRooms({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.rooms).then(res => {
          commit('SET_ROOMS', res);
          resolve(res)
        }, error => {
          reject(error)
        });
      })
    },
    validateRoomNumber(_, number) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.rooms + `/validateroomnumber/${number}`).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    createRoom(_, roomInfo) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.rooms + '/create', roomInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    updateRoom(_, roomInfo) {
      return new Promise((resolve, reject) => {
        api.put(conf.server.apis.rooms + '/update', roomInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    deleteRoom(_, roomId) {
      return new Promise((resolve, reject) => {
        api.remove(conf.server.apis.rooms + `/delete/` + roomId).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    }
  },
  mutations: {
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    }
  }
}