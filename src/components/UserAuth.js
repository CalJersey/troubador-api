import React, {Component} from "react";
// import $ from "jquery-ajax";
// import {Link} from "react-router";
import {Button, Input} from "react-materialize";

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userId: this.props.userId,
      isAuthenticated: this.props.isAuthenticated,
    };
    console.log("constructorUserId=",this.state.userId)
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
          <Input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
          <Input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <Button type="submit" value="login">Login</Button>
        </form>

      )
    } else {
      return (
        <p>logged in
          <Button className="logout-button" onClick={this.props.handleLogout}>
            Logout
          </Button>
        </p>
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
      </div>

    )
  }
}
export default UserAuth;
