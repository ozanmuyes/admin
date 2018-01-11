import bus from 'event/bus';

export default function initializeListeners() {
  return new Promise((resolve, reject) => {
    // Get all the js files except 'index.js'
    const req = require.context('./', false, /^(?!.*index).*\.js$/);
    let currReq = null;

    req.keys().forEach((key) => {
      if (!key.startsWith('./_')) {
        currReq = req(key);
// debugger;
        if (currReq.default) {
          // NOTE Default export of a listener MUST be the inizitialize method
          if (typeof currReq.default !== 'function') {
            reject(new Error(`Unrecognized export from listener file. Please check on '${key}'.`));
          } else {
            try {
              currReq.default.call(currReq, bus);
            } catch (error) {
              // const theError = new Error(
              //   `Unrecognized export from listener file. Please check on '${error.filename}'`);
              // theError.previous = error;
              // reject(theError);
              //
              // This is due to unrecognized export has been made from listener file.
              // Check the responsible listener file to fix it or disabling (by
              // renaming the file to have a suffix '[./]_').
              // TODO Get responsible listener name
              reject(error);
            }
          }
          // currReq.default.call(currReq, bus);
        } else if (typeof currReq.initialize === 'function') {
          // Alternatively a listener may export its `initialize` method by name
          currReq.initialize.call(currReq, bus);
        }
      }
    });
// debugger;
    resolve();
  });
}
