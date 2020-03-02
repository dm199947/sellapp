import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';




//全局注册viewUI内的所有组件，让所有组件都可以直接使用此UI框架的组件
Vue.use(ViewUI);
Vue.config.productionTip = false


//把store注入到vue实例中
//注入的所有key不能修改，大小写也不能改都有特殊意义
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')