import {
  reqInsertPost,
  reqFindPost,
  reqUpdatePost,
  reqDeletePost,
} from "@/api";

//岗位信息小仓库
export default {
  namespaced: true, // 开启命名空间
  state() {
    return {
      data: [
        { id: 1, value: "hhh", label: "老师" },
        { id: 2, value: "hhsdfh", label: "厨师" },
        { id: 3, value: "hhssh", label: "程序员" },
        { id: 4, value: "hffafhh", label: "飞行员" },
        { id: 5, value: "阿斯蒂芬撒", label: "员" },
        { id: 6, value: "阿斯芬撒", label: "师" },
      ],
      msg: {
        Dmsg: false,
        Umsg: false,
        Amsg: false,
      },
    };
  },
  getters: {},
  mutations: {
    //岗位信息录入
    ADD(state, value) {
      state.data.push(value);
      state.msg.Amsg = true;
    },
    //岗位信息查询
    FIND(state, value) {
      state.data = value;
    },

    DEL(state, id) {
      const index = state.data.findIndex((item) => item.id === id); // 找到指定id的对象在数组中的索引
      if (index !== -1) {
        state.data.splice(index, 1); // 使用splice方法删除指定索引的对象
        state.msg.Dmsg = true;
      }
    },
    UPDATE(state, data) {
      // 使用id作为唯一标识符在数据中定位。
      // 如果找到匹配的对象则使用对象的解构语法更新匹配对象的属性
      const index = state.data.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...data };
        state.msg.Umsg = true;
        // console.log("更新成功");
      }
    },
    RESETMSG(state) {
      state.msg.Amsg = false;
      state.msg.Umsg = false;
      state.msg.Dmsg = false;
      // console.log("RESETMSG被调用");
    },
  },
  actions: {
    // 查找岗位信息
    fetchData({ commit }) {
      reqFindPost()
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data)
            commit("FIND", res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加岗位信息
    addpost(context, data) {
      const post = {};
      post.label = data.postName;
      post.value = data.pdescription;
      // console.log(data);
      reqInsertPost(data)
        .then((res) => {
          if (res.status == 200) {
            context.commit("ADD", post);
            // alert("录入成功！");
          }
        })
        .catch((error) => {
          console.log(error); // 这里捕获到的是错误对象
        });
    },

    del(context, id) {
      reqDeletePost(id)
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
      // context.commit("UPDATE", data);
      //  console.log(data)
      // console.log(data.id)
      reqUpdatePost(data.id, data)
        .then((res) => {
          if (res.status == 200) {
            context.commit("UPDATE", data);
            // alert("修改成功");
          }
        })
        .catch((error) => {
          console.log(error); // 这里捕获到的是错误对象
        });
    },
  },
};
