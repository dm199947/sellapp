import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';




//全局注册viewUI内的所有组件，让所有组件都可以直接使用此UI框架的组件
Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')