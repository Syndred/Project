import { createStore } from "vuex";

export default createStore({
  state: {
    message: [
      {
        name: "小红",
        age: "22",
        eBG: "本科",
        school: "广东技术师范大学",
        wAge: "1",
      },
      {
        name: "小蓝",
        age: "23",
        eBG: "本科",
        school: "香港中文大学",
        wAge: "1",
      },
      {
        name: "小绿",
        age: "33",
        eBG: "研究生",
        school: "深圳大学",
        wAge: "4",
      },
      {
        name: "小粉",
        age: "32",
        eBG: "研究生",
        school: "厦门大学",
        wAge: "5",
      },
      {
        name: "紫薇",
        age: "25",
        eBG: "大专",
        school: "深圳信息职业技术学院",
        wAge: "1",
      },
    ],
  },
  getters: {},
  mutations: {
    ADD(state, value) {
      state.message.push(value);
    },
    DEL(state, index) {
      state.message.splice(index, 1);
    },
    UPDATE(state, { index, editedRow }) {
      Object.assign(state.message[index], editedRow);
    },
  },
  actions: {
    add(context, value) {
      context.commit("ADD", value);
    },
    del(context, index) {
      context.commit("DEL", index);
    },
    update(context, { index, editedRow }) {
      context.commit("UPDATE", { index, editedRow });
    },
  },
  modules: {},
});
