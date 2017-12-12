import { READY_FOR_SIDEBAR_ROUTES } from 'event/types';
import store from 'store'; // [PRCSVHNDLST]

function initialize(bus) {
  bus.$once(READY_FOR_SIDEBAR_ROUTES, () => {
    // TODO After 'routes/for' implement here [PRCSVHNDLST]

    store.commit('SET_SIDEBAR_ROUTES', {
      routes: [
        { name: 'zalım', path: '/kar', title: 'zalim yarim' },
      ],
    });
  });
}

export default initialize;
