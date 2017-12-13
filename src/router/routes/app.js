import AdminLayout from 'layouts/Admin';

import AdminDashboard from 'pages/AdminDashboard';
import AdminUsersIndex from 'pages/Admin/Users/Index';
import AdminUsersView from 'pages/Admin/Users/View';
import AdminUsersEdit from 'pages/Admin/Users/Edit';

export default {
  // base: '/me',
  // This will be concatenated as it is each route in this file every
  // route exported from this file will have `meta` field.
  // Route items (entries of `routes` below) tend to override those.
  meta: {
    from: 'file',
    roles: ['admin'],
  },
  // TODO `path`s should be acceptable by `<a>` as 'href'
  routes: [
    {
      path: '/',
      component: AdminLayout,
      meta: {
        name: 'dashboard', // NOTE This is crucial to breadcrumbs rendered correctly. Otherwise
                           // there will be at least 2 dashboard links consecutive.
        from: 'route',
        roles: ['mod'],
        index: -1,
      },
      children: [
        {
          path: '',
          name: 'app.index',
          component: AdminDashboard,
          meta: {
            title: 'dashboard',
          },
        },
      ],
    },
    {
      path: '/users',
      // name: 'users.index',
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
            title: 'wohoo!!1',
          },
        },
        {
          path: ':userId',
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
};
