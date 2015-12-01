'use strict';

const TAG = '[Markdown-edit]';

let log = (() =>{
  if (!(console && console.log)) {
    return () => {};
  }
  if (!console.log.bind) {
    return (...args) => {
      console.log([TAG].concat(args).join(' '));
    };
  }
  return console.log.bind(console, TAG);
})();

let warn = (() =>{
  if (!(console && console.warn)) {
    return () => {};
  }
  if (!console.warn.bind) {
    return (...args) => {
      console.warn([TAG].concat(args).join(' '));
    };
  }
  return console.warn.bind(console, TAG);
})();

function nextTick(func) {
  setTimeout(func, 0);
}

const Utils = {
  log: log,
  nextTick: nextTick,
  warn: warn
};

export default Utils;
