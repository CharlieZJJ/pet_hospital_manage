import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: (localStorage.getItem("login") && JSON.parse(localStorage.getItem("login"))) || null
  },
  getters: {
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  }
})
