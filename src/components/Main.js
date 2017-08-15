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
    window.location = "/";
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

    if (this.state.isAuthenticated !== false) {
      console.log("user is not logged in");
      return (
        <div className="MainPage">
          <nav>
            <article>
              <Header isAuthenticated={this.state.isAuthenticated} />
            </article>

            <div>
              <div className="move-right">
                <form onSubmit={this.handleSubmit}>
                  <Input
                    type="text"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <Button type="submit" value="login">
                    Login
                  </Button>
                </form>
              </div>
            </div>
          </nav>

          <article>
            <div className="content-body">
              <PageContent />
            </div>
            <div className="row">
              <div className="col-md-3 city-list-menu">
                <CityContainer />
              </div>
              <div className="col-md-9">
                <CityInfo />
                <PostBox
                  postUrl={"http://localhost:3001/api/posts/"}
                  citiesPostUrl={"http://localhost:3001/api/posts/cities/"}
                  defaultCityId={1}
                  cityId={postCityId}
                />
              </div>
            </div>
          </article>
        </div>
      );
    } else {
      console.log("user is logged in");
      return (
        <div>

          <div className="MainPage">
            <nav>
              <article>
                <Header isAuthenticated={this.state.isAuthenticated} />
                <div className="move-right">
                  <p>logged in</p>
                  <Button className="logout-button" onClick={this.handleLogout}>
                    Logout
                  </Button>
                </div>
              </article>
            </nav>

            <article>
              <div className="content-body">
                <PageContent />
              </div>
              <div className="row">
                <div className="col-md-2 city-list-menu">
                  <CityContainer
                    isAuthenticated={this.state.isAuthenticated}
                    username={this.state.username}
                    id={this.state.id}
                  />
                </div>
                <div className="col-md-10">
                  <CityInfo />
                  <PostBox
                    postUrl={"http://localhost:3001/api/posts/"}
                    citiesPostUrl={"http://localhost:3001/api/posts/cities/"}
                    defaultCityId={1}
                    cityId={postCityId}
                  />
                </div>
              </div>
            </article>

          </div>

          <div classNamer="col" />
        </div>
      );
    }
  }
}

export default Main;
