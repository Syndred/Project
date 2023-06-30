//简历信息小仓库
import axios from "axios";
export default {
  state() {
    return {
      data: [
        // {
        //   id: "0",
        //   name: "小红",
        //   age: "22",
        //   eBG: "本科",
        //   school: "广东技术师范大学",
        //   wAge: "1",
        // },
        // {
        //   id: "1",
        //   name: "小蓝",
        //   age: "23",
        //   eBG: "本科",
        //   school: "香港中文大学",
        //   wAge: "1",
        // },
        // {
        //   id: "2",
        //   name: "小绿",
        //   age: "33",
        //   eBG: "研究生",
        //   school: "深圳大学",
        //   wAge: "4",
        // },
        // {
        //   id: "3",
        //   name: "小粉",
        //   age: "32",
        //   eBG: "研究生",
        //   school: "厦门大学",
        //   wAge: "5",
        // },
        // {
        //   id: "4",
        //   name: "紫薇",
        //   age: "25",
        //   eBG: "大专",
        //   school: "深圳信息职业技术学院",
        //   wAge: "1",
        // },
      ],
    };
  },
  getters: {},
  mutations: {
    Find(state, data) {
      state.data = data;
    },
    ADD(state, value) {
      state.data.push(value);
    },
    DEL(state, id) {
      const index = state.data.findIndex((item) => item.id === id); // 找到指定id的对象在数组中的索引
      if (index !== -1) {
        state.data.splice(index, 1); // 使用splice方法删除指定索引的对象
      }
    },
    UPDATE(state, data) {
      // 使用id作为唯一标识符在数据中定位。
      // 如果找到匹配的对象则使用对象的解构语法更新匹配对象的属性
      const index = state.data.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...data };
        //  console.log("更新成功");
      }
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get(
          "http://192.168.43.202:8080/api/selectAll"
        );
        // console.log(response.message);
        commit("Find", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    add(context, data) {
      axios
        .post("http://192.168.43.202:8080/api/insertOne", data)
        .then(function (response) {
          if (response.status == 200) {
            context.commit("ADD", data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    del(context, id) {
      axios
        .post(`http://192.168.43.202:8080/api/deleteOne/${id}`)
        .then(function (response) {
          // console.log(response);
          if (response.status == 200) {
            context.commit("DEL", id);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    update(context, data) {
      // context.commit("UPDATE", sizeForm);
      // console.log(data)
      // console.log(data.id)
      axios
        .post(`http://192.168.43.202:8080/api/updateOne/${data.id}`, data)
        .then(function (response) {
          // console.log(response);
          if (response.status == 200) {
            context.commit("UPDATE", data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
