import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Nav',
      component: () =>  import('@/views/nav/indexPage.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/HomePage.vue'),
        },
        {
          path: '/cv',
          name: 'cvTemplate',
          component: () => import('@/views/cv-template/indexPage.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/indexPage.vue'),
          redirect: '/user/cv',
          children: [
            {
              path: '/user/Information',
              name: 'userInformation',
              component: () => import('@/views/user/components/UserInformation.vue'),
            },
            {
              path: '/user/cv',
              name: 'userCv',
              component: () => import('@/views/user/components/UserCv.vue'),
            },
            {
              path: '/user/cvAdmn',
              name: 'cvAdmn',
              component: () => import('@/views/user/components/CvAdmn.vue'),
            }
          ]
        }
      ],
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/edit/indexPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/indexPage.vue'),
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  },
})

export default router

// 登录访问拦截
// router.beforeEach((to) => {
//   if (!userStore.isLogin && to.path.includes('/user')) return '/login'
// })
