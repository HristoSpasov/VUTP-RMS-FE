import api from '../../core/api'
import conf from '../../core/conf'

export default {
  state: {
    rooms: []
  },
  getters: {
    rooms: state => state.rooms
  },
  actions: {
    async getRooms({commit}) {
      await api.get(conf.server.apis.rooms).then(res => {
        commit('SET_ROOMS', res);
      });
    }
  },
  mutations: {
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    }
  }
}