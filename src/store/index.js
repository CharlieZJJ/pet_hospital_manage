import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: (sessionStorage.getItem("login") && JSON.parse(sessionStorage.getItem("login"))) || null
  },
  getters: {
    isLogIn(state) {
      if (state === null) {
        return {
          isLogIn: false,
          token: "",
        }
      } else {
        return {
          isLogIn: true,
          token: state.userInfo.token,
        }
      }
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  }
})
