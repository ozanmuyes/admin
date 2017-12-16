export default {
  app: {
    breakpoint: '',
    hasSidebarOpened: true,
    sidebarRoutes: [],
    visitedViews: [], // NOTE This is not necessary as the visited ones store in the Taskbar too \
    // Unless we want to store the taskbar's state in the user's browser
    cachedViews: [],
    //
  },
  user: {
    access_token: '',
    refresh_token: '',
    email: '',
    id: -1,
    role: '',
    first_name: '',
    last_name: '',
    username: '',

    is_enabled: false,
    verified_at: '',

    created_at: '',
    modified_at: '',
    deleted_at: null,
  },
  //
};
