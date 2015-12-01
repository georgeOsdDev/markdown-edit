'use strict';

import React from 'react';

import ActionCreator from '../actions/ActionCreator';

import Header from './header';
import Editor from './editor';
import Viewer from './viewer';

import InputStore from '../stores/Input';
import OutputStore from '../stores/Output';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this._onInputChange.bind(this);
    this.onOutputChange = this._onOutputChange.bind(this);
    this.state = {
      input: InputStore.data(),
      output: OutputStore.data(),
      converter: 'marked'
    };
  }

  _onInputChange(){
    let nextInput = InputStore.data();
    if (nextInput !== this.state.input){
      this.setState({
        input: nextInput
      }, () => {
        this.doConvert();
      });
    }
  }

  _onOutputChange(){
    this.setState({
      output: OutputStore.data()
    });
  }

  doConvert(){
    if (this.state.converter === 'gfm'){
      ActionCreator.convertWithGFM(this.state.input);
    } else {
      ActionCreator.convertWithMarked(this.state.input);
    }
  }

  componentDidMount() {
    InputStore.addChangeListener(this.onInputChange);
    OutputStore.addChangeListener(this.onOutputChange);
  }

  componentWillUnmount() {
    InputStore.removeChangeListener(this.onInputChange);
    OutputStore.removeChangeListener(this.onOutputChange);
  }

  render() {
    return (
      <div>
        <Header />
        <div key='content'>
          <section id="main">
            <Editor input={this.state.input}/>
            <Viewer output={this.state.output}/>
            <div className="clear"></div>
          </section>
        </div>
      </div>
    );
  }
}

Application.propTypes = {

};

Application.defaultProps = {

};

export default Application;
