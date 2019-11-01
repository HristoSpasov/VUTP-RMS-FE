export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false
  },
  getters: {
    isLoading: state => state.isLoading
  },
  actions: {
    
  },
  mutations: {
    SET_ISLOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  }
}