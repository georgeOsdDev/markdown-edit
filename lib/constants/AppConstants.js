'use strict';

const UserEvents = {
  CONVERT: 'CONVERT',
  EDIT: 'EDIT',
  READ_FILE: 'READ_FILE',
  SWITCH_CONVERTER: 'SWITCH_CONVERTER',
  VIEW_HTML: 'VIEW_HTML'
};

const StoreEvents = {
  CHANGE: 'CHANGE'
};

const ErrorEvents = {
  API_EEROR: 'API_ERROR',
  READ_FILE_ERROR: 'READ_FILE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
};

export {
  UserEvents,
  StoreEvents,
  ErrorEvents
};
