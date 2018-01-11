import LoginPage from 'pages/Login';
// import LogoutPage from 'pages/Logout';
import SetPasswordPage from 'pages/SetPassword';

import store from 'store';
import { LOGOUT } from 'store/mutation-types';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      isHidden: true,
      title: 'login',
      index: -300,
    },
    // TODO Uncomment the lines below - commented for test purposes
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        // TODO Maybe show an alert stating that the user has already been logged in
        next({ name: 'index' });
      } else {
        next();
      }
    },
  },
  {
    path: '/password',
    name: 'set_password',
    component: SetPasswordPage,
    // no `meta`
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      title: 'logout',
      index: 5169, // possibly the biggest number in sidebar index
      icon: 'fa fa-fw fa-sign-out',
    },
    beforeEnter: (to, from, next) => {
      // FIXME Show confirm box
// console.log(this);
// debugger;
//       this.$confirm('Are you sure you want to log out?', 'Logout?', {
//         type: 'warning',
//         confirmButtonText: 'Yes',
//         confirmButtonClass: 'el-button--danger',
//         cancelButtonText: 'No',
//       })
//       .then((/* response */) => {
//         //
//       })
//       .catch((err) => {
//         //
//       });

      if (store.getters.isLoggedIn) {
        store.commit(LOGOUT);

        window.location = 'http://localhost:8080'; // TODO navigate to `store.state.links.homepage`
        // window.location = 'http://localhost:8765/'; // TODO navigate to `store.state.links.homepage`
        next(false);
      } else {
        next({ name: 'Login' });
      }
    },
  },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   component: LogoutPage,
  //   meta: {
  //     title: 'logout',
  //     index: 5169, // possibly the biggest number in sidebar index
  //     icon: 'fa fa-fw fa-sign-out',
  //   },
  //   beforeEnter(to, from, next) {
  //     if (!store.getters.isLoggedIn) {
  //       next({ name: 'Login' });
  //     } else {
  //       next();
  //     }
  //   },
  // },
];
