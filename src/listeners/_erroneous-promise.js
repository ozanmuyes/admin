const rejectingPromise = new Promise((resolve, reject) => {
  // TODO reject here with a timeout
  setTimeout(() => {
    reject();
  }, 420);
});

export default rejectingPromise;
