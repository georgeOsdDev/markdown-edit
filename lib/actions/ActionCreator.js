'use strict';

import marked from 'marked';
import highlightJS from 'highlight.js';
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  highlight: function (code) {
    return highlightJS.highlightAuto(code).value;
  }
});

import request from 'superagent';

import {UserEvents, ErrorEvents} from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Utils from '../utils/Utils';


const Action = {
  convertWithGFM(input) {
    request
      .post('https://api.github.com/markdown/raw')
      .send(input)
      .set('contentType', 'text/plain')
      .end(function(err, res){
        if(err) {
          AppDispatcher.dispatch({
            type: ErrorEvents.API_ERROR,
            data: {
              message: 'Failed to call GitHub API',
              error: err
            }
          });
        } else {
          AppDispatcher.dispatch({
            type: UserEvents.CONVERT,
            data: {
              output: res
            }
          });
        }
      });
  },

  convertWithMarked(input) {
    Utils.nextTick(() => {
      AppDispatcher.dispatch({
        type: UserEvents.CONVERT,
        data: {
          output: marked(input)
        }
      });
    });
  },

  switchConverter(gfmOrMarked){
    AppDispatcher.dispatch({
      type: UserEvents.SWITCH_CONVERTER,
      data: {
        useGFM: gfmOrMarked === 'gfm'
      }
    });
  },

  inputChange(input) {
    AppDispatcher.dispatch({
      type: UserEvents.EDIT,
      data: {
        input: input
      }
    });
  },

  changeTheme(theme) {
    AppDispatcher.dispatch({
      type: UserEvents.CHANGE_THEME,
      data: {
        theme: theme
      }
    });
  },

  viewHTML() {
    AppDispatcher.dispatch({
      type: UserEvents.VIEW_HTML,
      data: {
      }
    });
  },

  readFile(file) {
    if (!file) {
      AppDispatcher.dispatch({
        type: ErrorEvents.READ_FILE_ERROR,
        data: {
          message: 'File not found'
        }
      });
      return;
    }
    if (file.type && !file.type.match('text.*')) {
      AppDispatcher.dispatch({
        type: ErrorEvents.READ_FILE_ERROR,
        data: {
          message: 'File should be plain text'
        }
      });
      return;
    }

    let reader = new FileReader();
    reader.onerror = function() {
      AppDispatcher.dispatch({
        type: ErrorEvents.READ_FILE_ERROR,
        data: {
          message: 'File should be plain text'
        }
      });
      return;
    };
    reader.onload = function(evt) {
      AppDispatcher.dispatch({
        type: UserEvents.READ_FILE,
        data: {
        }
      });
    };
    reader.readAsText(file, 'utf-8');
  }

};

export default Action;
