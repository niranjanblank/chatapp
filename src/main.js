import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './vueRoutes'

 
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
