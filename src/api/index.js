//当前这个模块用于api的统一管理
import requests from "./request";

// 简历请求
//发送增加简历信息的请求
export const reqInserOne = (data) =>
  requests({ url: "/insertOne", method: "post", data });
// 删除简历信息请求
export const reqDeleteOne = (id) =>
  requests({ url: `/deleteOne/${id}`, method: "post" });
//修改简历信息请求
export const reqUpdateOne = (id, data) =>
  requests({ url: `/updateOne/${id}`, method: "post", data });
//发送查看所有简历信息的请求(axios发请求返回的是Promise对象)
export const reqSelectAll = () => requests({ url: "/getScore", method: "get" });

// 岗位请求
//增加岗位信息请求
export const reqInsertPost = (data) =>
  requests({ url: "/insertPost", method: "post", data });
//删除岗位信息请求
export const reqDeletePost = (id) =>
  requests({ url: `/deletePost/${id}`, method: "post" });
//修改岗位信息请求
export const reqUpdatePost = (id, data) =>
  requests({ url: `/updatePost/${id}`, method: "post", data });
// 查找岗位信息请求
export const reqFindPost = () =>
  requests({ url: "/selectPost", method: "get" });

// 首页信息请求
export const reqFindSum = () => requests({ url: "/Range", method: "get" });

//简历解析请求
export const reqAnalysis = (id) =>
  requests({ url: `/GetJsonById/${id}`, method: "post" });
