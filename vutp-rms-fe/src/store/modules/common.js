export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
    dropdownConfig: {
      options: [],
      placeholder: "--Select--",
      backgroundColor: "#cde4f5",
      textColor: "black",
      borderRadius: "1.5em",
      border: "1px solid gray",
      width: 320
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    dropdownConfig: state => state.dropdownConfig
  },
  actions: {
    
  },
  mutations: {
    SET_ISLOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  }
}