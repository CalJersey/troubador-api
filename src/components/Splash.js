import React, { Component } from "react";
import Header from "./Header";
import "../MainStyle.css";
import { Link } from "react-router";
import CityList from "./CityList";
import { Button, Input } from "react-materialize";
import $ from "jquery-ajax";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      id: "",
      isAuthenticated: false
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
      url: `http://localhost:3001/login`,
      data: {
        username: username,
        password: password
      }
    }).then(
      res => {
        console.log("res is ", res);
        this.setState({ isAuthenticated: true, id: res._id });
        window.location = "/login";
      },
      err => {
        console.log("oops!");
        console.log(err);
      }
    );
  }
  handleLogout() {
    this.setState({ isAuthenticated: false, id: "" });
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  getInitialState() {
    return { isAuthenticated: false };
  }
  render() {
    if (this.state.isAuthenticated === false) {
      console.log("user is not logged in");
      return (
        <div className="MainPage">
          <Header isAuthenticated={this.state.isAuthenticated} />

          <div className="row container splash-login-container">
            <div className="col-md-12 splash-login-form">

              <form onSubmit={this.handleSubmit}>
                <Input
                  id="input1"
                  type="text"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
                <Input
                  id="input2"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <Button id="login-button" type="submit" value="login">
                  Login
                </Button>
              </form>
            </div>

          </div>

          <div className="row">
            <div className="col-md-12 image-splash" />
          </div>
          <main className="flex-center">
            <div id="left-topic">
              <h3>Top Cities</h3>
              <hr />
              <p>
                Find tips on a wide range of topics, from where to find
                historical landmarks to names of the best shopping centers.This
                is a perfectly tailored website for your next adventure.
              </p>
            </div>

            <div id="middle-topic">
              <h3>Destinations</h3>
              <hr />
              <p>
                Our site is jam packed with the information you need for all
                your travels. Get excited and picture what you will experience.
              </p>
            </div>

            <div id="right-topic">
              <h3>Adventures</h3>
              <hr />
              <p>
                Make your life easier and use Wayfarer to plan your next trip.
                Go explore and discover your next adventure.
              </p>
            </div>
          </main>
        </div>
      );
    } else {
      console.log("user is logged in");
      return (
        <div>
          <p>logged in</p>

          <div classNamer="col">
            <Button className="logout-button" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Splash;
