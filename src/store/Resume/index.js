//简历信息小仓库
import axios from "axios";
export default {
  state() {
    return {
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
    };
  },
  getters: {},
  mutations: {
    Find(state, data) {
      state.data = data;
      console.log(state.data);
    },
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
    async fetchData({ commit }) {
      try {
        const response = await axios.get(
          "http://172.16.1.197:8080/api/selectAll"
        );
        console.log(response.message);
        commit("Find", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    // find(context) {
    //   axios
    //     .get("https://1f8e-58-250-175-140.ngrok-free.app/api/selectAll")
    //     .then(function (response) {
    //       console.log(response.message+response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   context.commit("Find", response.data);
    // },

    add(context, value) {
      context.commit("ADD", value);
    },

    del(context, id) {
      axios
        .post(`http://192.168.43.202:8088/api/deleteOne/${id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      context.commit("DEL", id);
    },

    update(context, sizeForm) {
      context.commit("UPDATE", sizeForm);
    },
  },
};
