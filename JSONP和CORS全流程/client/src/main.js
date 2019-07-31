import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import VueRouter from 'vue-router'
import JSONP from './components/jsonp.vue'
import CROS from './components/cros.vue'
import Index from './components/index.vue'
import './style/style.less'

Vue.prototype.axios=Axios

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/jsonp', name:'jsonp', component: JSONP },
  { path: '/cros', name:'cros', component: CROS },
  { path: '*', name:'index', component: Index },
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
