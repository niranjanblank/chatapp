import Vue from 'vue'
import VueRouter from 'vue-router'
import GroupChat from './components/GroupChat'
import JoinGroup from './components/JoinGroup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'JoinGroup',
    component: JoinGroup
  },
  {
    path: '/group',
    name: 'GroupChat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: GroupChat,
    props: true,
    beforeEnter: (to,from,next)=>{
        if(to.params.currentUser && to.params.roomId) {
          next()
        }
        else{
          next({name:'JoinGroup'})
        }
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router