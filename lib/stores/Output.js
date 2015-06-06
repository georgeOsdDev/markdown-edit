'use strict';

import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

import {UserEvents, StoreEvents} from '../constants/AppConstants';

const CHANGE_EVENT = StoreEvents.CHANGE;

let output = '';

const Output = assign({}, EventEmitter.prototype, {
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
    return output;
  }
});

Output.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case UserEvents.CONVERT:
    output = action.data.output;
      break;
    default:
      break;
  }

});

export default Output;
