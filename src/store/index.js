import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//新建store并暴露
export default new Vuex.Store({
    //交互数据
    state: {
        goodslist: [] //所有商品数组
    },
    //改变，它是改变state的唯一方式
    mutations: {
        //初始化商品数组
        initGoodsList(state, newArr) {
            state.goodslist = newArr
        },
        addnum(state, payload) {
            for (let i of state.goodslist) {
                for (let j of i.foods) {
                    if (j.name == payload.name) {
                        j.num += payload.val
                    }
                }
            }
        }
    },

    //vuex边的计算属性（和computed原理一样，会缓存数据,只要）
    getters: {
        getAdult(state) {
            state.list
        }
    }
})


























// //使用:1.创建一个vuex的数据仓库，用来存放所有需要交互的数据
// // store:每一个vuex最核心的部分，数据仓库（用来存储所有交互数据）
// var store = new Vuex.Store({
//     //存放所有交互数据
//     state: {
//         name: '张三'
//     },

//     //改变，它是改变state的唯一方式
//     mutations: {
//         //只有mutation里的小函数才可以直接改变state数据
//         //每一个mutation都会接收一个形参state，就指向上面的state
//         changeName(state, name) {
//             state.name = name
//         }
//     }

// })


//store:仓库对象实例


//mutation函数必须手动触发
//参数1：要触发的mutation的名字，参数2：要传入的参数
// store.commit('changeName', '小蝙蝠') //触发一个mutation

//取值，仓库实例.state.属性名
// console.log(store.state.name);

// export default store