import { reqInsertPost } from "@/api";

//岗位信息小仓库
export default {
  namespaced: true, // 开启命名空间
  state() {
    return {
      data: [
        { value: "hhh", label: "老师" },
        { value: "hhsdfh", label: "厨师" },
        { value: "hhssh", label: "程序员" },
        { value: "hffafhh", label: "飞行员" },
      ],
    };
  },
  getters: {},
  mutations: {
    // Find(state, data) {
    //   state.data = data;
    // },
    ADD(state, value) {
      state.data.push(value);
    },
    // DEL(state, id) {
    //   const index = state.data.findIndex((item) => item.id === id); // 找到指定id的对象在数组中的索引
    //   if (index !== -1) {
    //     state.data.splice(index, 1); // 使用splice方法删除指定索引的对象
    //   }
    // },
    // UPDATE(state, data) {
    //   // 使用id作为唯一标识符在数据中定位。
    //   // 如果找到匹配的对象则使用对象的解构语法更新匹配对象的属性
    //   const index = state.data.findIndex((item) => item.id === data.id);
    //   if (index !== -1) {
    //     state.data[index] = { ...state.data[index], ...data };
    //     //  console.log("更新成功");
    //   }
    // },
  },
  actions: {
    // async fetchData({ commit }) {
    //   try {
    //     const res = await reqSelectAll(); // 等待reqSelectAll函数执行并获取返回结果
    //     // console.log(res)
    //     commit("Find", res.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    addpost(context, data) {
      // console.log(data);
      // let obj={}
      // obj.id = data.nanoid
      // obj.postName=data.pname
      const post = {};
      post.label = data.postName;
      post.value = data.pdescription;
      reqInsertPost(data)
        .then((res) => {
          if (res.status == 200) {
            context.commit("ADD", post);
            alert("录入成功！");
          }
        })
        .catch((error) => {
          console.log(error); // 这里捕获到的是错误对象
        });
    },

    // del(context, id) {
    //   reqDeleteOne(id)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         context.commit("DEL", id);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error); // 这里捕获到的是错误对象
    //     });
    // },
    // update(context, data) {
    //   // context.commit("UPDATE", sizeForm);
    //   // console.log(data)
    //   // console.log(data.id)
    //   reqUpdateOne(data.id, data)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         context.commit("UPDATE", data);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error); // 这里捕获到的是错误对象
    //     });
    // },
  },
};
