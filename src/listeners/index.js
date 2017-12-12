import bus from 'event/bus';

export const listeners = [];

export async function initialize() {
  return new Promise((resolve) => {
    // Get all the js files except 'index.js'
    const req = require.context('./', false, /^(?!.*index).*\.js$/);
    let currReq = null;

    req.keys().forEach((key) => {
      currReq = req(key);
      if (currReq.default) {
        // NOTE Default export of a listener MUST be the inizitialize method
        currReq.default.call(currReq, bus);
      } else if (typeof currReq.initialize === 'function') {
        // Alternatively a listener may export its `initialize` method by name
        currReq.initialize.call(currReq, bus);
      }
    });

    // TODO Set `listeners`

    resolve();
  });
}
