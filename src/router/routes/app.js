import AdminDashboard from 'pages/AdminDashboard'; // [TDADMPL]

export default {
  // base: '/me',
  // This will be concatenated as it is each route in this file every
  // route exported from this file will have `meta` field.
  // Route items (entries of `routes` below) tend to override those.
  meta: {
    from: 'file',
    roles: ['admin'],
  },
  routes: [
    {
      path: '/',
      name: 'app.index',
      component: AdminDashboard, // [TDADMPL]
      meta: {
        from: 'route',
        roles: ['mod'],
      },
    },
  ],
};
