import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/views/todoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: todoList
    }
  ]
})
