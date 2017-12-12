import {
  LOCAL_STATE_LOADED,
  // ROUTES_LOADED,
} from 'event/types';
// import store from 'store';

function initialize(bus) {
  bus.$on(LOCAL_STATE_LOADED, () => {
    // We can now get routes for sidebar ???
  });

  // bus.$on(ROUTES_LOADED, () => {
  //   // We can now get routes for sidebar ???

  //   store.commit('SET_SIDEBAR_ROUTES', {
  //     routes: [
  //       { name: 'zalım', path: '/kar' },
  //     ],
  //   });
  // });
}

export default initialize;
