import React, {Component} from "react";
import $ from "jquery-ajax";
// import {Link} from "react-router";
// import {Button, Input} from "react-materialize";
import UserAuth from "./UserAuth";

class UserAuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      userId: this.props.userId,
      isAuthenticated: this.props.isAuthenticated,
    }
    // this.setAuthState=this.setAuthState.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.setAuthState=this.setAuthState.bind(this);
  }

  handleSubmit(e) {
    let username=e.username;
    let password=e.password;
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
      this.setAuthState(true,res._id);
    }, err => {
      console.log("oops!");
      console.log(err);
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({isAuthenticated: false, userId: ""});
    this.setAuthState(false,"");
  }


  setAuthState(isAuth,userId){
    this.setState({isAuthenticated:isAuth, userId:userId});
  }

  render() {
    return(

      <UserAuth
        userId={this.state.userId}
        isAuthenticated={this.state.isAuthenticated}
        loginUrl={this.props.loginUrl}
        setAuthState={this.setAuthState}
        onUserSubmit={this.handleSubmit}
        handleLogout={this.handleLogout} />
    )
  }
}
export default UserAuthContainer;
