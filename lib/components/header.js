'use strict';

import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <header id="header">
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><i className="fa fa-pencil-square-o"></i>&nbsp;Markdown Edit</a>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {

};
Header.defaultProps = {

};

export default Header;
