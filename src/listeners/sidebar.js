// This listener is an example of 'redurer listener'.

import {
  // depending events to listen
  USER_LOGGED_IN,
  ROUTES_LOADED,
  // event to be emitted
  READY_FOR_SIDEBAR_ROUTES,
} from 'event/types';

let theBus = null;
let param = null;

function checkAndEmit() {
  // `this` is the `emittedEvents` array (as proxy's 'target')

  // Check for the particular conditions for this very reducer (listener)
  if (
    this.indexOf(USER_LOGGED_IN) > -1 &&
    this.indexOf(ROUTES_LOADED) > -1
  ) {
    // Conditions were met emit the event (use `theBus`)
    theBus.$emit(READY_FOR_SIDEBAR_ROUTES, param);
  }
}

// Proxy this, when added automatically check for condition to emit its event
const handlerTraps = {
  get(target, thisArg) {
    /**
     * `target` is the object which proxy'd (in this case it is the `emittedEvents`)
     * `thisArg` is the property name which was requested (get)
     * `parametersList` TODO
     *
     */

    switch (thisArg) {
      case 'push': {
        // call the check fn after push
        setTimeout(() => {
          checkAndEmit.call(target);
        }, 0);

        break;
      }

      default:
        // Go on and `return target[thisArg]`
    }

    return target[thisArg];
  },
};
const emittedEvents = new Proxy([], handlerTraps);

function initialize(bus) {
  theBus = bus;

  // Since `emittedEvents` array automatically runs condition(s)
  // check, simply `push`ing the listened event is enough.
  //
  bus.$once(USER_LOGGED_IN, () => {
    emittedEvents.push(USER_LOGGED_IN);
  });

  bus.$once(ROUTES_LOADED, (loadedRoutes) => {
    emittedEvents.push(ROUTES_LOADED);

    param = loadedRoutes;
  });
}

export default initialize;
