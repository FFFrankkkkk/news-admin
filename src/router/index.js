import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/components/test'
import home from '@/components/home'
import login from '@/components/user/public/login'
import manageMain from '@/components/user/manageUIMain/manageMain'
import changePrivate from '@/components/user/manage/changePrivate'
import showPrivate from '@/components/user/manage/showPrivate'
import newsShowByType from '@/components/news/newsShowByType'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path:'/',
      name:'home',
      component:home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/manageMain',
      name: 'manageMain',
      component: manageMain,
      //嵌套路由，children中的组件会显示在manageMain组件中的<router-view></router-view>中，而不是App组件的<router-view></router-view>中
      children: [
        {
          path: 'changePrivate',
          name: 'changePrivate',
          component: changePrivate
        },
        {
          path: 'showPrivate',
          name: 'showPrivate',
          component: showPrivate
        }
      ]
    },
    {
      path: '/newsShowByType',
      name: 'newsShowByType',
      component: newsShowByType
    }

  ]
})
