import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  state: {
    userData: {},
    userBasicData:{}
  },
  mutations: {
    saveUser(state, userData) {
      state.userData = userData;
    },
    saveUserBasicData(state,userBasicData){
        state.userBasicData=userBasicData
    }
  },
  getters: {},
  actions: {
    saveUser({ commit }, userData) {
      commit("saveUser", userData);
    },
    saveUserBasicData({commit},userBasicData){
        commit('saveUserBasicData',userBasicData)
    }
  },
  plugins: [
    createPersistedState({
      // 存储方式：localStorage（默认）/ sessionStorage
      storage: window.localStorage,
      // 指定需要持久化的状态（不指定则默认所有状态都持久化）
      paths: ["userData","userBasicData"], // 只持久化 userInfo 和 token
      // 键名（localStorage 中保存的 key）
      key: "vuexState",
    }),
  ],
});
export default store;
