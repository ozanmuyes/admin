/* eslint-disable no-unused-vars */
/* eslint-disable */

// TODO Make this a class that extends from './_base.js'

// import base

// class EventBusBootstrap { // extends Base
//   constructor() {
//     // TODO Also call parent's ctor if necessary and not done automatically
//   }
// }

// --------------------------------------------------------------------------------

import bus from 'event/bus';

export const name = 'EventBus';
export const priority = -5169;

function initialize({ Vue }, ...params) {
  // TODO Test if `$bus` will work on a component w/o this
  // Inject global event bus

  Vue.prototype.$bus = bus;

  return bus;
}

export default initialize;
