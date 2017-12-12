import AdminDashboard from 'pages/AdminDashboard'; // [TDADMPL]
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
      name: 'app.index',
      component: AdminDashboard, // [TDADMPL]
      meta: {
        title: 'dashboard',
        from: 'route',
        roles: ['mod'],
        index: -1,
      },
    },
    {
      path: '/users',
      name: 'users.index',
      component: AdminUsersIndex,
      meta: {
        title: 'users',
        subtitle: 'list',
      },
      children: [
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
          // alias: '/',
          redirect: '//google.com',
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
