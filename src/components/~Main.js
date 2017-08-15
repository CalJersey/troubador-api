import React, { Component } from "react";
import Header from "./Header";
import $ from "jquery-ajax";
import { Link } from "react-router";
import { browserHistory } from "react-router";
import CityContainer from "./CityContainer";
import PageContent from "./PageContent";
import CityInfo from "./CityInfo";
import PostBox from "./PostBox";

import { Button, Card, Row, Col, Input } from "react-materialize";

class Main extends Component {
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
    ///city context for posts
    let postCityId = 1;
    if (this.state.city) {
      postCityId = this.state.city;
    }

    if (this.state.isAuthenticated === false) {
      console.log("user is not logged in");
      return (
        <div className="MainPage">
          <div className="container">
            <div className="row">
              <Header handleSubmit={event => this.handleSubmit} />
              <div className="col-sm-4">
                <div className="row">
                  <form onSubmit={this.handleSubmit}>
                    <div className="col-md-6">
                      <Input
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                      <Button type="submit" value="login">
                        Login
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="row">
              <PageContent />
            </div>
            <div className="row">
              <div className="col-sm-4">
                <CityContainer />
              </div>
              <div className="col-sm-8">
                <CityInfo />
                <PostBox
                  postUrl={"http://localhost:3001/api/posts/"}
                  citiesPostUrl={"http://localhost:3001/api/posts/cities/"}
                  defaultCityId={1}
                  cityId={postCityId}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("user is logged in");
      return (
        <div>
          <p>logged in</p>
          <div classNamer="col">
            <CityContainer
              isAuthenticated={this.state.isAuthenticated}
              username={this.state.username}
              id={this.state.id}
            />
            <Button className="logout-button" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Main;
