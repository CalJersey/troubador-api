import React, { Component } from "react";
// import { Link } from "react-router";
import UserAuthContainer from "./UserAuthContainer"

//import { browserHistory } from "react-router";
//import $ from "jquery-ajax";

class Header extends Component {
  render() {
    return (
      <div className="nav-bar">
        <h1>Wayfarer</h1>
        <UserAuthContainer
          userId={this.props.userId}
          isAuthenticated={this.props.isAuthenticated}
          loginUrl={this.props.loginUrl} />

      </div>
    );
  }
}

export default Header;
