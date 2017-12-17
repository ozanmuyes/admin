/* eslint-disable no-unused-vars */

import Layout from 'layouts/Index'; // ~[SGNRCLYT]
// import AdminLayout from 'layouts/Admin'; // ~[SGNRCLYT]: use a generic layout
// // import LecturerLayout from 'layouts/Lecturer';

import UserPageWrapper from 'wrappers/User';

import Dashboard from 'pages/Dashboard';

import AdminUsersIndex from 'pages/Admin/Users/Index';
import AdminUsersView from 'pages/Admin/Users/View';
import AdminUsersEdit from 'pages/Admin/Users/Edit';
import AdminUsersAdd from 'pages/Admin/Users/Add';
import AdminQuizzesIndex from 'pages/Admin/Quizzes/Index';
import AdminQuizzesAdd from 'pages/Admin/Quizzes/Add';
import AdminQuizzesView from 'pages/Admin/Quizzes/View';
import AdminQuizzesEdit from 'pages/Admin/Quizzes/Edit';

export default {
  // base: '/me',
  // This will be concatenated as it is each route in this file every
  // route exported from this file will have `meta` field.
  // Route items (entries of `routes` below) tend to override those.
  meta: {
    roles: ['admin', 'lecturer'],
  },
  // TODO `path`s should be acceptable by `<a>` as 'href'
  routes: [
    {
      path: '/',
      component: Layout, // ~[SGNRCLYT]
      // component: AdminLayout, // ~[SGNRCLYT]
      meta: {
        roles: ['mod'],
        index: -1,
        icon: 'fa fa-fw fa-tachometer',
      },
      children: [
        {
          path: '',
          name: 'index',
          component: Dashboard,
          meta: {
            name: 'dashboard',
            title: 'dashboard',
          },
        },
      ],
    },
    {
      path: '/quizzes',
      component: Layout, // ~[SGNRCLYT]
      // component: AdminLayout, // ~[SGNRCLYT]
      meta: {
        title: 'quizzes',
        // TODO What if there is no 'subtitle'?
        subtitle: 'gesi bağları',
      },
      children: [
        {
          path: '',
          name: 'quizzes.index',
          component: AdminQuizzesIndex,
          meta: {
            title: 'list',
          },
        },
        {
          path: 'new',
          name: 'quizzes.add',
          component: AdminQuizzesAdd,
          meta: {
            title: 'new',
          },
        },
        {
          path: ':quizId',
          name: 'quizzes.view',
          component: AdminQuizzesView,
          meta: {
            title: 'view',
          },
          children: [
            {
              path: 'edit',
              name: 'quizzes.edit',
              component: AdminQuizzesEdit,
              meta: {
                title: 'edit',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/users',
      component: Layout, // ~[SGNRCLYT]
      // component: AdminLayout, // ~[SGNRCLYT]
      meta: {
        title: 'users',
        subtitle: 'list',
      },
      children: [
        {
          path: '',
          name: 'users.index',
          component: AdminUsersIndex,
          meta: {
            title: 'list',
          },
        },
        {
          path: 'add',
          name: 'users.add',
          component: AdminUsersAdd,
          meta: {
            title: 'add',
          },
        },
        {
          path: ':userId',
          component: UserPageWrapper,
          children: [
            {
              path: '',
              name: 'users.view',
              component: AdminUsersView,
              meta: {
                title: 'view',
              },
            },
            {
              path: 'edit',
              name: 'users.edit',
              component: AdminUsersEdit,
              // // alias: '/',
              // redirect: '//google.com',
              meta: {
                title: 'edit',
                subtitle: 'edit user',
              },
            },
            //
          ],
        },
      ],
    },
  ],
};
