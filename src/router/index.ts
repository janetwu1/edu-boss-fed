import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName： 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true // 自定义数据
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName： 'home' */'@/views/home/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName： 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName： 'advert-space' */'@/views/advert-space/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName： 'course' */'@/views/course/index.vue')
      },
      {
        path: '/course-create',
        name: 'course-create',
        component: () => import(/* webpackChunkName： 'course-create' */'@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/course-edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName： 'course-edit' */'@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName： 'course-section' */'@/views/course/section.vue'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName： 'course-video' */'@/views/course/video.vue'),
        props: true
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName： 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName： 'menu-create-edit' */'@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName： 'menu-create-edit' */'@/views/menu/edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName： 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName： 'role' */'@/views/role/index.vue')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName： 'alloc-menu' */'@/views/role/alloc-menu.vue'),
        props: true // 将路由路径参数映射到组件的props中
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName： 'user' */'@/views/user/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName： '404' */'@/views/error/404.vue')
  }
]
const router = new VueRouter({
  routes
})

// 全局前置收尾：任何页面的访问都要经过这里
// to:要到哪里的路由信息
// from：从哪里来的路由信息
// next：通用的标志
router.beforeEach((to, from, next) => {
  // console.log('进入了路由全局守卫')
  // console.log('to => ', to)
  // console.log('from => ', from)

  // to.matched 是一个数组(匹配到路由记录)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: { // 通过 url 传递
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next() // 允许通过
    }
  } else {
    next() // 允许通过
  }
  // 路由守卫中一定要调用 next，否则页面无法展示
  // next()
})

export default router
