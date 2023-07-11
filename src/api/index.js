//当前这个模块用于api的统一管理
import requests from "./request";

//发送查看所有简历信息的请求(axios发请求返回的是Promise对象)
export const reqSelectAll = () =>
  requests({ url: "/selectAll", method: "get" });

//发送增加简历信息的请求
export const reqInserOne = (data) =>
  requests({ url: "/insertOne", method: "post", data });

// 修改简历信息请求
export const reqDeleteOne = (id) =>
  requests({ url: `/deleteOne/${id}`, method: "post" });

//修改简历信息请求
export const reqUpdateOne = (id, data) =>
  requests({ url: `/updateOne/${id}`, method: "post", data });

//增加岗位信息请求
export const reqInsertPost = (data) =>
  requests({ url: "/insertPost", method: "post", data });

// 查找岗位匹配
export const reqMatchingPost = (data) =>
  requests({ url: `/searchJob/${data}`, method: "get" });
