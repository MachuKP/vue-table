import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
        objectData: {},
    }
  },
  getters: {
    getObject(state) { return state.objectData }
  },
  mutations: {
    setUpData(state, data) {
      state.objectData = data
    },
    setByKey(state, data) {
      state.objectData[Object.keys(data)[0]] = Object.values(data)[0];
    }
  },
  actions: {
    setUpDataAction(context, payload) {
        context.commit('setUpData', payload)
    },
    setByKeyAction(context, payload) {
        context.commit('setByKey', payload);
    }
  },
});