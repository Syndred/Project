// 引入mockjs模块
import Mock from "mockjs";
//引入json模拟数据
import indexMsg from './indexMsg.json'
//模拟数据
Mock.mock("/api/Range",  indexMsg );