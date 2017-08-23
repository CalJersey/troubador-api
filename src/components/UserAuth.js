import React, {Component} from "react";
import $ from "jquery-ajax";
import {Link} from "react-router";
import {Button, Input} from "react-materialize";

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userId: "",
      isAuthenticated: this.props.isAuthenticated,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    $.ajax({
      method: "POST",
      url: this.props.loginUrl,
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      console.log("res is ", res);
      this.setState({isAuthenticated: true, userId: res._id});
      this.props.setAuthState(true,res._id);
    }, err => {
      console.log("oops!");
      console.log(err);
    });
  }
  handleLogout() {
    this.setState({isAuthenticated: false, userId: ""});
    this.props.setAuthState(false,"");
  }
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  getInitialState() {
    this.props.setAuthState(false,"");
    return {isAuthenticated: false};
  }
  renderLoginForm(){
    if (!this.state.isAuthenticated) {

      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
            <Input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
            <Button type="submit" value="login">Login</Button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <p>logged in</p>
          <Button className="logout-button" onClick={this.handleLogout}>
            Logout
          </Button>
        </div>
      )
    }
  }
  render() {
    let loginFormContent = this.renderLoginForm()
    return(
        <div className="UserAuth move-right">
          {loginFormContent}
        </div>

    )
  }
}
export default UserAuth;
