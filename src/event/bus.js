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
// Instance of the singleton bus
const EventBus = new Vue();

/**
 * The facade below is for enabling the hooks for the bus. For example we
 * may log each call of any facade methods for debugging. By this way
 * we can extend the bus - e.g. adding 'compose' method.
 */

const facade = {
  on(...params) {
// console.log(`BUS | Registered for ${params[0]}`);
    return EventBus.$on(...params);
  },
  once(...params) {
// console.log(`BUS | Registered for ${params[0]}`);
    return EventBus.$once(...params);
  },
  off(...params) {
// console.log(`BUS | Unregister from ${params[0]}`);
    return EventBus.$off(...params);
  },
  emit(...params) {
// console.log(`BUS | Emitting ${params[0]}`);
    return EventBus.$emit(...params);
  },
  emitAsync(...params) {
    let delay = 10;
    if (typeof params[0] === 'number') {
      delay = params[0];

      // Remove the delay param from `params`
      params.splice(0, 1);
    }
// console.log(`BUS | Emitting ${params[0]} async`, params);

    setTimeout(() => {
      EventBus.$emit(...params);
    }, delay);
  },
  emitTimeout(timeout, ...params) { // TODO See `emitAsync` method
    if (typeof timeout !== 'number') {
      console.log('WARNING | EventBus: First (timeout) parameter MUST be number. Emitting without timeout...');

      EventBus.$emit(...params);
    } else {
      setTimeout(() => {
        EventBus.$emit(...params);
      }, timeout);
    }
  },
  //
};

facade.$on = facade.on;
facade.$once = facade.once;
facade.$off = facade.off;
facade.$emit = facade.emit;
//

export default facade;
