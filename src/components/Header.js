import React, { Component } from "react";
import { Link } from "react-router";

//import { browserHistory } from "react-router";
//import $ from "jquery-ajax";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }
  // authCheck() {
  //   this.state.isAuthenticated = this.props.isAuthenticated;
  // }
  // authCheck()
  //
  // handleLogin() {
  //   this.props.handleSubmit(this.state.username, this.state.password);
  // }
  // handleUsername() {
  //   this.props.handleUsernameChange(this.state.username);
  // }
  // handleUsernameChange(e) {
  //   this.setState({ username: e.target.value });
  // }
  // handlePasswordChange(e) {
  //   this.setState({ password: e.target.value });
  // }
  render() {
    this.state.isAuthenticated = this.props.isAuthenticated;
    console.log(this.state.isAuthenticated);
    return (
      <div className="nav-bar">
        <h1>Wayfarer</h1>
        <div className="topnav" id="myTopnav">
          <a id="profile" href="/user">
            Profile
          </a>
          <a id="signup" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
