import LoginPage from 'pages/Login';

import store from 'store';
import { LOGOUT } from 'store/mutation-types';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      isHidden: true,
    },
    // TODO Uncomment the lines below - commented for test purposes
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isLoggedIn) {
    //     // TODO Maybe show an alert stating that the user has already been logged in
    //     next({ path: `/${store.state.user.role}` });
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      title: 'logout',
      index: 5169, // possibly the biggest number in sidebar index
    },
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        store.commit(LOGOUT);

        window.location = 'http://localhost:8765/'; // TODO navigate to `store.state.links.homepage`
        next(false);
      } else {
        next({ name: 'Login' });
      }
    },
  },
];