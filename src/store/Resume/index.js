//简历信息小仓库
import { reqInserOne, reqSelectAll, reqDeleteOne, reqUpdateOne } from "@/api";
export default {
  namespaced: true, // 开启命名空间
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
          jobName: "当狗的司机",
        },
        {
          id: "1",
          name: "小蓝",
          age: "23",
          eBG: "本科",
          school: "香港中文大学",
          wAge: "1",
          jobName: "飞行员",
        },
        {
          id: "2",
          name: "小绿",
          age: "33",
          eBG: "研究生",
          school: "深圳大学",
          wAge: "4",
          jobName: "程序员",
        },
        {
          id: "3",
          name: "小粉",
          age: "32",
          eBG: "研究生",
          school: "厦门大学",
          wAge: "5",
          jobName: "厨师",
        },
        {
          id: "4",
          name: "紫薇",
          age: "25",
          eBG: "大专",
          school: "深圳信息职业技术学院",
          wAge: "1",
          jobName: "老师",
        },
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
        const res = await reqSelectAll(); // 等待reqSelectAll函数执行并获取返回结果
        // console.log(res)
        commit("Find", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    add(context, data) {
       context.commit("ADD", data);
      reqInserOne(data)
        .then((res) => {
          if (res.status == 200) {
            // context.commit("ADD", data);
          }
        })
        .catch((error) => {
          console.log(error); // 这里捕获到的是错误对象
        });
    },

    del(context, id) {
      reqDeleteOne(id)
        .then((res) => {
          if (res.status == 200) {
            context.commit("DEL", id);
          }
        })
        .catch((error) => {
          console.log(error); // 这里捕获到的是错误对象
        });
    },
    update(context, data) {
      // context.commit("UPDATE", sizeForm);
      // console.log(data)
      // console.log(data.id)
      reqUpdateOne(data.id, data)
        .then((res) => {
          if (res.status == 200) {
            context.commit("UPDATE", data);
          }
        })
        .catch((error) => {
          console.log(error); // 这里捕获到的是错误对象
        });
    },
  },
};
