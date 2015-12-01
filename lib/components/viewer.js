'use strict';

import React from 'react';

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidUpdate(){
    // $("#out pre code").each(function(i, e) {
    //   global.hljs.highlightBlock(e);
    // });
  }

  render() {
    return (
      <div id="out" className="" style={{display: 'block'}}
        dangerouslySetInnerHTML={{__html: this.props.output}} />
    );
  }
}

Viewer.propTypes = {
  output: React.PropTypes.string
};
Viewer.defaultProps = {
  output: '<span></span>'
};

export default Viewer;
