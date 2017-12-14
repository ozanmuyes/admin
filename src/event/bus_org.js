// DEPRECATED

/**
 * The reason that the default exported constant is an Vue instance is that
 * we need something to convey the events on. The closest thing so far, if
 * not a hand-crafted event bus library, is anoter Vue instance.
 * The down-side of it that we can not see the emitted events in the Vue
 * panel of the DevTools. Nevertheless we are unable to use or require
 * a base instance of something as the conveyor. Therefore this file
 * can not export a factory function. Also note that multi instance
 * is not supported, the class is singleton.
 */

import Vue from 'vue';

/* eslint-disable import/no-mutable-exports */
export let EventBus = null;
export let facade = {
  on: () => {
    console.warn('BUS#facade | \'on\' called but facade was not set or export issue.');
  },
  once: () => {
    console.warn('BUS#facade | \'once\' called but facade was not set or export issue.');
  },
  off: () => {
    console.warn('BUS#facade | \'off\' called but facade was not set or export issue.');
  },
  emit: () => {
    console.warn('BUS#facade | \'emit\' called but facade was not set or export issue.');
  },
  emitAsync: () => {
    console.warn('BUS#facade | \'emitAsync\' called but facade was not set or export issue.');
  },
};
facade.$on = facade.on;
facade.$once = facade.once;
facade.$off = facade.off;
facade.$emit = facade.emit;

export function initialize() {
  // Instance of the singleton bus
  EventBus = new Vue();

  /**
   * The facade below is for enabling the hooks for the bus. For example we
   * may log each call of any facade methods for debugging. By this way
   * we can extend the bus - e.g. adding 'compose' method.
   */

  facade = {
    on(...params) {
  console.log(`BUS | Registered for ${params[0]}`);
      return EventBus.$on(...params);
    },
    once(...params) {
  console.log(`BUS | Registered for ${params[0]}`);
      return EventBus.$once(...params);
    },
    off(...params) {
      return EventBus.$off(...params);
    },
    emit(...params) {
  console.log(`BUS | Emitting ${params[0]}`);
      return EventBus.$emit(...params);
    },
    emitAsync(...params) {
      let delay = 10;
      if (typeof params[0] === 'number') {
        delay = params[0];

        // Remove the delay param from `params`
        params.splice(0, 1);
      }
  console.log(`BUS | Emitting ${params[0]} async`, params);

      setTimeout(() => {
        EventBus.$emit(...params);
      }, delay);
    },
    //
  };
console.log('facade set');

  facade.$on = facade.on;
  facade.$once = facade.once;
  facade.$off = facade.off;
  facade.$emit = facade.emit;
  //

  return facade;
}

export default facade;
