//把所有请求封装接口文件(方便项目后期维护，所有请求统一管理)

import axios from 'axios'
// var axios = require('axios')

// axios.defaults.baseURL = 'http://localhost:3000'
//完全等效
//创建一个请求对象
let req = axios.create({
    // baseURL: 'http://192.168.6.103:3000', //基本路径
    baseURL: 'http://localhost:3000', //基本路径
    timeout: 10000 //ms 请求10秒，如果10秒还没有请求到，则提示超时！！ （8-12秒） 超时限制

})

//超时
//请求商家信息
export function getSeller() {
    return req.get('/api/seller')
}

//请求商家商品信息
export function getGoods() {
    return req.get('/api/goods')
}

//请求用户评价信息
export function getRatings() {
    return req.get('/api/ratings')
}