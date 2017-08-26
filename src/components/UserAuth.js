import React, {Component} from "react";
// import $ from "jquery-ajax";
// import {Link} from "react-router";

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userId: this.props.userId,
      isAuthenticated: this.props.isAuthenticated,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let username = this.state.username.trim();
    let password = this.state.password.trim();

    if (!username || !password) {
      return;
    }
    this.props.onUserSubmit({ username: username, password: password });

  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  componentWillUpdate(){
    this.state.userId= this.props.userId
    this.state.isAuthenticated= this.props.isAuthenticated
  }

  renderLoginForm(){
    if (!this.state.isAuthenticated) {

      return (

        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} /><br />
          <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/><br />
          <button className="btn btn-primary" type="submit" value="login">Login</button>
        </form>

      )
    } else {
      return (
        <a href="#" className="navLink" onClick={this.props.handleLogout}>Log Out</a>

      )
    }
  }
  renderUserAuthNavLinks(){
    if (this.props.isAuthenticated){
      let UserLink = `/user/${this.props.userId}`
      return (
        <a className="navLink" id="profile" href={UserLink}>
          Profile
        </a>
      )
    }
    else {
      return (
        <a className="navLink" id="signup" href="/signup">
          Sign Up
        </a>
      )
    }
  }
  render() {
    let loginFormContent = this.renderLoginForm()
    let userAuthNavLinks = this.renderUserAuthNavLinks()
    return(
      <div className="userAuth">
        <div className="loginForm">
          {loginFormContent}
        </div>
        {userAuthNavLinks}
        <a className="navLink" href="/cities">
          Home
        </a>
      </div>

    )
  }
}
export default UserAuth;
