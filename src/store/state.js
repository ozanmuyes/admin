export default {
  app: {
    breakpoint: '',
    breadcrumbs: [], // [USSTRNSTD]
    hasSidebarOpened: true,
    sidebarRoutes: [],
    visitedViews: [], // NOTE This is not necessary as the visited ones store in the Taskbar too \
    // Unless we want to store the taskbar's state in the user's browser
    cachedViews: [],
    //
  },
  user: {
    email: '',
    id: -1,
    role: '', // FIXME SECURE THIS. Lecturer user might change this and act like if she is \
              //       an admin, at least in the front-end application (assuming a control \
              //       is making on every request that requires auth).
    first_name: '',
    last_name: '',
    username: '',

    is_enabled: false,
    verified_at: '',

    created_at: '',
    modified_at: '',
    deleted_at: null,

    // Because they are so long,
    // we put them bottom.
    access_token: '',
    refresh_token: '',
  },
  //
};
