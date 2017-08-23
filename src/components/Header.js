import React, { Component } from "react";
import { Link } from "react-router";
import UserAuth from "./UserAuth"

//import { browserHistory } from "react-router";
//import $ from "jquery-ajax";

class Header extends Component {
  constructor(props) {
    super(props);
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
  renderUserAuthNavLinks(){
    if (this.props.isAuthenticated){
      let UserLink = `/user/${this.props.userId}`
      return (
        <a id="profile" href={UserLink}>
          Profile
        </a>
      )
    }
    else {
      return (
        <a id="signup" href="/signup">
          Sign Up
        </a>
      )
    }
  }

  render() {

    let userAuthNavLinks = this.renderUserAuthNavLinks();

    return (
      <div className="nav-bar">

        <UserAuth
        userId = {this.props.userId}
        isAuthenticated = {this.props.isAuthenticated}
        loginUrl = {this.props.loginUrl}
        setAuthState={this.props.setAuthState} />

          <h1>Wayfarer</h1>

        <div className="topnav" id="myTopnav">
          {userAuthNavLinks}

        </div>
      </div>
    );
  }
}

export default Header;
