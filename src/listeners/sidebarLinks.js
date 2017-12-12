import { READY_FOR_SIDEBAR_ROUTES } from 'event/types';
import store from 'store';
// import routes from 'router/routes'; // TODO Maybe use event's parameter [SVNTPRM]
import reducerForSidebar from 'router/reducers/sidebar';

function initialize(bus) {
  // bus.$once(READY_FOR_SIDEBAR_ROUTES, () => {
  bus.$once(READY_FOR_SIDEBAR_ROUTES, (routes) => { // [SVNTPRM]
    store.commit('SET_SIDEBAR_ROUTES', { routes: reducerForSidebar(routes) });
  });
}

export default initialize;
