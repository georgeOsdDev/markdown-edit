'use strict';

import Utils from './Utils';

const Storage = window.localStorage;

let set = (key, val) => {
  try {
    const obj = {
      value: val
    };
    Storage.setItem(key, JSON.stringify(obj));
  } catch (e){
    Utils.warn('Failed to save data to localStorage', key);
  }
};

let get = (key) => {
  let obj = Storage.getItem(key) || {value: {}};
  try {
    return JSON.parse(obj).value;
  } catch (e) {
    Utils.warn('Failed to get data from localStorage', key);
    return {};
  }
};

let remove = (key) => {
  Storage.removeItem(key);
};

let clear = () => {
  Storage.clear();
};

export default {
  set: set,
  get: get,
  remove: remove,
  clear: clear
};
