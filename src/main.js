import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './vueRoutes'
import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
 
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)
Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: io("http://localhost:3000/",{
    withCredentials: false
  })
}))
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
