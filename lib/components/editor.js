'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import brace from 'brace';
require('brace/mode/markdown');
require('brace/theme/github');
import AceEditor from 'react-ace';

import ActionCreator from '../actions/ActionCreator';


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.ReactDom = ReactDom;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onInputChange(newValue){
    ActionCreator.inputChange(newValue);
  }

  render() {
    return (
      <div id="in" style={{display: 'block', border:'solid 1px'}}>
        <AceEditor
          ref='editor'
          width='100%'
          height='100%'
          highlightActiveLine={true}
          mode="markdown"
          theme="github"
          readOnly={false}
          value={this.props.input}
          name='me-input'
          editorProps={{$blockScrolling: Infinity}}
          onChange={this.onInputChange.bind(this)}
          onPaste={this.onInputChange.bind(this)}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  input: React.PropTypes.string
};
Editor.defaultProps = {
  input: ''
};

export default Editor;
