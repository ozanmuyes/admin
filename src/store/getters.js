export default {
  isLoggedIn(state) {
    return (
      typeof state.user !== 'undefined' && state.user !== null &&
      typeof state.user.access_token !== 'undefined' && state.user.access_token !== null &&
      state.user.access_token !== ''
    );
  },
  username(state) {
    return (state.user.username || 'N/A Username');
  },
  avatar(state) {
    // Black blank image;
    return (state.user.picture || 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
    // White blank image;
    // return (state.user.picture ||
    //   'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  },
};
