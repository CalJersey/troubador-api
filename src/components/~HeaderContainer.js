import React, { Component } from "react";
// import { Link } from "react-router";
import Header from "./Header"

//import { browserHistory } from "react-router";
//import $ from "jquery-ajax";

class HeaderContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   //this.renderUserAuthNavLinks = this.renderUserAuthNavLinks.bind(this);
  // }
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

    return (
      <Header
        loginUrl={this.props.loginUrl}
        isAuthenticated={this.state.isAuthenticated}
        userId = {this.state.userId} />

    );
  }
}

export default HeaderContainer;
