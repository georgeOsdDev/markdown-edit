'use strict';

import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {UserEvents, StoreEvents} from '../constants/AppConstants';

const CHANGE_EVENT = StoreEvents.CHANGE;

let input = '';

const Input = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
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
      break;
    default:
      break;
  }

});

export default Input;
