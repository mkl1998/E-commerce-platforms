import Vue from 'vue'
import App from './App.vue'
import router from '../src/router'
// 引入typenav
import TypeNav from '../src/components/TypeNav'
// 引入分页器
import Pagination from '../src/components/Pagination'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入仓库
import store from './store'
// 映入swiper
import 'swiper/css/swiper.css'
import '@/validate/validate'

import { MessageBox } from 'element-ui'

Vue.config.productionTip = false
// 注册TypeNav为全局组件
Vue.component(TypeNav.name,TypeNav)
// 注册Pagination为全局组件
Vue.component(Pagination.name,Pagination)
Vue.use(VueLazyload)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入mockserve
import '../src/mock/mockServe'
import * as API from '@/api'



new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
}).$mount('#app')


