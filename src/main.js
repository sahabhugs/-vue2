import Vue from 'vue'
import App from './App.vue'
//引入路由相关文件
import router from '@/router';
//引入仓库进行注册
import store from '@/store'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//全局组件：第一个参数：全局组件的名字name  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//引入mockServer.js----mock数据
import '@/mock/mockServer';
//引入swiper样式
import "swiper/css/swiper.css";
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //配置全局事件总线￥bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册路由:底下的写法是kv一致省略v【router小写的】
  router,
  //注册仓库:组件实例的身上
  store
}).$mount('#app')
