import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'


Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'

// 全局样式必须放在main.js中  方便后期维护

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
