/* eslint-disable no-console */

const log = (message: unknown, ...args: unknown[]) => {
  if (__DEV__) {
    console.log(`[INFO] ${message}`, ...args);
  }
};

const warn = (message: unknown, ...args: unknown[]) => {
  if (__DEV__) {
    console.log(`[WARN] ${message}`, ...args);
  }
};

const error = (message: unknown, ...args: unknown[]) => console.log(`[ERROR] ${message}`, ...args);

const deep = (...args: unknown[]) => {
  if (__DEV__) {
    args.forEach(arg => {
      if (typeof arg === 'object' && arg !== null) {
        console.log(`\n${JSON.stringify(arg, null, '\t')}`);
      } else {
        console.log(arg);
      }
    });
    console.log(`------END------\n`);
  }
};

export default { log, warn, error, deep };
