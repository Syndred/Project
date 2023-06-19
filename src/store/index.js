import { createStore } from "vuex";

export default createStore({
  state: {
    data: [
      {
        id: "0",
        name: "小红",
        age: "22",
        eBG: "本科",
        school: "广东技术师范大学",
        wAge: "1",
      },
      {
        id: "1",
        name: "小蓝",
        age: "23",
        eBG: "本科",
        school: "香港中文大学",
        wAge: "1",
      },
      {
        id: "2",
        name: "小绿",
        age: "33",
        eBG: "研究生",
        school: "深圳大学",
        wAge: "4",
      },
      {
        id: "3",
        name: "小粉",
        age: "32",
        eBG: "研究生",
        school: "厦门大学",
        wAge: "5",
      },
      {
        id: "4",
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
      state.data.push(value);
    },
    DEL(state, id) {
      state.data.splice(id, 1);
    },
    UPDATE(state, sizeForm) {
      // 使用id作为唯一标识符在数据中定位。
      // 如果找到匹配的对象则使用对象的解构语法更新匹配对象的属性
      const index = state.data.findIndex((item) => item.id === sizeForm.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...sizeForm };
        // console.log("更新成功");
      }
    },
  },
  actions: {
    add(context, value) {
      context.commit("ADD", value);
    },
    del(context, id) {
      context.commit("DEL", id);
    },
    update(context, sizeForm) {
      context.commit("UPDATE", sizeForm);
    },
  },
  modules: {},
});
