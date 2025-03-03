import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/indexPage.vue'
import HomePage from '@/views/Home/HomePage.vue';
import CvTemplateView from '@/views/CvTemplate/CvTemplate.vue';
import EditPage from '@/views/Edit/EditPage.vue';

import User from '@/views/User/indexPage.vue';
import UserInformation from '@/views/User/components/UserInformation.vue';
import UserCv from '@/views/User/components/UserCv.vue';
import CvAdmn from '@/views/User/components/CvAdmn.vue';

import LoginPage from '@/views/Login/LoginPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
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
})

export default router
