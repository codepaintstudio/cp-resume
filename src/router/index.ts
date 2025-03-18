import { createRouter, createWebHashHistory } from 'vue-router'
import Nav from '@/views/nav/indexPage.vue'
import HomePage from '@/views/home/HomePage.vue';
import CvTemplateView from '@/views/cv-template/indexPage.vue';
import EditPage from '@/views/edit/indexPage.vue';

import User from '@/views/user/indexPage.vue';
import UserInformation from '@/views/user/components/UserInformation.vue';
import UserCv from '@/views/user/components/UserCv.vue';
import CvAdmn from '@/views/user/components/CvAdmn.vue';

import LoginPage from '@/views/login/indexPage.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Nav',
      component: Nav,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomePage,
        },
        {
          path: '/cv',
          name: 'cvTemplate',
          component: CvTemplateView
        },
        {
          path: '/user',
          name: 'user',
          component: User,
          redirect: '/user/Information',
          children: [
            {
              path: '/user/Information',
              name: 'userInformation',
              component: UserInformation
            },
            {
              path: '/user/cv',
              name: 'userCv',
              component: UserCv
            },
            {
              path: '/user/cvAdmn',
              name: 'cvAdmn',
              component: CvAdmn
            }
          ]
        }
      ],
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
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
