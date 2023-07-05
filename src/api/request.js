//将axios进行二次封装
import axios from "axios";
// 利用axios对象的方法create创建一个axios实例request并配置
const requests = axios.create({
  //配置对象
  // 基础路径
  baseURL: "/api",
  // 请求超时时间
  timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
  return config; //config是一个配置对象，里面包含请求头
});

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功回调    
    // console.log(res)
    return res;
  },
  (error) => {
    //失败回调
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
