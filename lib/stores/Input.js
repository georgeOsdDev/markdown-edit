'use strict';

import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {UserEvents, StoreEvents} from '../constants/AppConstants';
import Storage from '../utils/Storage';

const CHANGE_EVENT = StoreEvents.CHANGE;
const STORAGE_KEY = 'ME-INPUT';

let input = Storage.get(STORAGE_KEY) || '';

const Input = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
    Storage.set(STORAGE_KEY, this.data());
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  data(){
    return input;
  }
});

Input.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case UserEvents.EDIT:
      input = action.data.input;
      Input.emitChange();
      break;
    default:
      break;
  }

});

export default Input;
