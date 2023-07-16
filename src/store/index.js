import { createStore } from "vuex";
// 引入数据存储插件
import createPersistedState from "vuex-persistedstate";

// 引入小仓库
import PostMsg from "./PostMsg";
import Resume from "./Resume";

export default createStore({
  modules: { PostMsg, Resume },
  // 插件配置
  plugins: [
    // 把vuex的数据存储到sessionStorage
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});