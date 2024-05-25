import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: "123",
    form: {
      avatar: "",
      password: "",
      nickname: "",
      age: Number,
      email: "",
      phone: "",
      sex: Number,
      id: "",
      area: "",
      hobby: "",
      work: "",
      design: "",
    },
    type: 1,
    scenename: "",
    roomname: "",
  },
  mutations: {
    Get_Token(state, s) {
      state.token = s;
    },
    Get_Form(state, s) {
      Object.assign(state.form, s);
    },
  },
});
export default store;
