import api from '../../core/api'
import conf from '../../core/conf'

export default {
  strict: true,
  namespaced: true,
  state: {
    events: [],
    filteredEvents: []
  },
  getters: {
    getEvents: state => state.events,
    getFilteredEvents: state => state.filteredEvents,
    getFilteredEventById: (state) => (eventId) => state.filteredEvents.find(ev => ev.id == eventId)
  },
  actions: {
    loadEvents({commit}) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.events).then(res => {
          commit('SET_EVENTS', res);
          return resolve(res);
        }, error => {
          return reject(error);
        });
      })
    },
    loadFilteredEvents({commit}, filterParams) {
      return new Promise((resolve, reject) => {
        api.get(conf.server.apis.events + `/filter?type=${filterParams.type}&id=${filterParams.id}`).then(res => {
          commit('SET_FILTERED_EVENTS', res);
          return resolve(res);
        }, error => {
          return reject(error);
        });
      })
    },
    createEvent(_, eventInfo) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.events + '/create', eventInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    updateEvent(_, eventInfo) {
      return new Promise((resolve, reject) => {
        api.post(conf.server.apis.events + '/update', eventInfo).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    },
    deleteEvent(_, eventId) {
      return new Promise((resolve, reject) => {
        api.remove(conf.server.apis.events + `/delete/` + eventId).then(res => {
          return resolve(res);
        }, error => {
          return reject(error)
        });
      });
    }
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_FILTERED_EVENTS(state, filteredEvents) {
      state.filteredEvents = filteredEvents;
    }
  }
}