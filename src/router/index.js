import Vue from 'vue'
import Router from 'vue-router'
import Login from 'common/Login'
import Layout from 'common/Layout'
import Index from 'page/Index'
import User from 'page/User'
import Role from 'page/Role'
import Tag from 'page/Tag'
import ViolationsVideo from 'page/ViolationsVideo'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/layout', component: Layout,children:[
      {path: 'index', component: Index},
      {path: 'user', component: User},
      {path: 'role', component: Role},
      {path: 'tag', component: Tag},
      {path: 'violationsVideo', component: ViolationsVideo},

    ]}
  ]
})
