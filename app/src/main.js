import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.prototype.$isLoggedIn = false
Vue.prototype.$basket = []
Vue.prototype.$userEmail = ''
Vue.prototype.$userName = ''

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
