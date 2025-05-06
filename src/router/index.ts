import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { ElMessage } from 'element-plus';

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
              path: '/user/cvAdmin',
              name: 'cvAdmin',
              component: () => import('@/views/user/components/CvAdmin.vue'),
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

router.beforeEach((to) => {
  const userStore = useUserStore()
  if(to.path.includes('/user')  && !userStore.userStatus.isLoggedIn) {
    ElMessage.error('当前未登录')
    return { name: 'login' }
  }
  if(to.path.includes('/edit')  && !userStore.userStatus.isLoggedIn) {
    ElMessage.error('当前未登录')
    return { name: 'login' }
  }
})
