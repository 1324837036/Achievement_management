import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'    //引入路由
import router from './router'  // 引入刚刚自己配置的路由信息

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from "axios";
import qs from 'qs';

import './static/css/style.css'
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = "/api"; //关键代码
// axios.defaults.baseURL = "/apis"; //关键代码

Vue.prototype.$qs = qs;

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
