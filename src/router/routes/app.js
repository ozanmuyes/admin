/* eslint-disable no-unused-vars */

import AdminLayout from 'layouts/Admin';
import PageWrapper from 'layouts/PageWrapper';

import AdminDashboard from 'pages/AdminDashboard';
import AdminUsersIndex from 'pages/Admin/Users/Index';
import AdminUsersView from 'pages/Admin/Users/View';
import AdminUsersEdit from 'pages/Admin/Users/Edit';
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
    roles: ['admin'],
  },
  // TODO `path`s should be acceptable by `<a>` as 'href'
  routes: [
    {
      path: '/',
      component: AdminLayout,
      meta: {
        roles: ['mod'],
        index: -1,
        icon: 'fa fa-fw fa-tachometer',
      },
      children: [
        {
          path: '',
          name: 'index',
          component: AdminDashboard,
          meta: {
            name: 'dashboard',
            title: 'dashboard',
          },
        },
      ],
    },
    {
      path: '/quizzes',
      component: AdminLayout,
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
    // {
    //   path: '/users',
    //   // name: 'users.index',
    //   component: AdminLayout,
    //   meta: {
    //     title: 'users',
    //     subtitle: 'list',
    //   },
    //   children: [
    //     {
    //       path: '',
    //       name: 'users.index',
    //       component: AdminUsersIndex,
    //       meta: {
    //         title: 'list',
    //       },
    //     },
    //     {
    //       path: ':userId',
    //       name: 'users.view',
    //       component: AdminUsersView,
    //       meta: {
    //         title: 'view',
    //       },
    //     },
    //     {
    //       path: 'edit',
    //       name: 'users.edit',
    //       component: AdminUsersEdit,
    //       // // alias: '/',
    //       // redirect: '//google.com',
    //       meta: {
    //         title: 'edit',
    //         subtitle: 'edit user',
    //       },
    //     },
    //     //
    //   ],
    // },
    {
      path: '/users',
      component: AdminLayout,
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
          path: ':userId',
          component: PageWrapper,
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
