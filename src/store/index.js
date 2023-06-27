import { createStore } from "vuex";
// import axios from "axios";

// 引入小仓库
import PostMsg from "./PostMsg";
import Resume from "./Resume";

export default createStore({

  modules: { PostMsg, Resume },
});
