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
    AppDispatcher.dispatch({
      type: UserEvents.CONVERT,
      data: {
        output: marked(input)
      }
    });
  },

  edit(input) {
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
        type: ErrorEvents.VALIDATION_ERROR,
        data: {
          message: 'File not found'
        }
      });
      return;
    }
    if (file.type && !file.type.match('text.*')) {
      AppDispatcher.dispatch({
        type: ErrorEvents.VALIDATION_ERROR,
        data: {
          message: 'File should be plain text'
        }
      });
      return;
    }

    let reader = new FileReader();
    reader.onerror = function() {
      AppDispatcher.dispatch({
        type: ErrorEvents.VALIDATION_ERROR,
        data: {
          message: 'File should be plain text'
        }
      });
      return;
    };
    reader.onload = function(evt) {
      AppDispatcher.dispatch({
        type: UserEvents.VIEW_HTML,
        data: {
        }
      });
    };
    reader.readAsText(file, 'utf-8');
  }

};

export default Action;
