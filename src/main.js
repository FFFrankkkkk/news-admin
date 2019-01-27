// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'  //引入axios  异步请求
import './css/1.css' //引入css
// Vue.config.productionTip = false

import global_ from './components/base.vue'
import store from './store'//引入store
Vue.prototype.GLOBAL = global_;
//设置服务器端地址为axios的访问体质
axios.defaults.baseURL=global_.BASE_URL;
//保持客户端访问服务器端时，保持session有效
axios.defaults.withCredentials=true;
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//使用路由
  store,//使用store
  components: { App },
  template: '<App/>'
})
