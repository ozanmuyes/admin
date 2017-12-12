export default {
  isLoggedIn(state) {
    return (
      typeof state.user !== 'undefined' && state.user !== null &&
      typeof state.user.access_token !== 'undefined' && state.user.access_token !== null &&
      state.user.access_token !== ''
    );
  },
};
