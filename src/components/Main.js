import React, { Component } from "react";
import Header from "./Header";
import {Link} from "react-router";
import {browserHistory} from "react-router";
import CityContainer from "./CityContainer";
import PageContent from "./PageContent";
import CityInfo from "./CityInfo";
import PostBox from "./PostBox";
import UserAuth from "./UserAuth";

import { Button, Card, Row, Col, Input } from "react-materialize";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.params.userId || this.props.route.config.defaultUserId,
      isAuthenticated: false,
      cityId: this.props.params.id || this.props.route.config.defaultCityId
    };
    //this.setAuthState = this.setAuthState.bind(this);
  }

  setAuthState(isAuth,userId){
    this.setState({isAuthenticated:isAuth, userId:userId});
  }

  renderPageContent() {
    return(
      <div className="PageContent">
        <PageContent pageContext={this.props.route.config.pageContext} />
      </div>
      )
    }
  render() {

    let pageContentNode = null;
    if (this.props.route.config.pageContext){
      pageContentNode = this.renderPageContent();
    }

    return (
      <div className="MainPage container-fluid">
        <nav>
          <article>
            <Header
              handleSubmit={event => this.handleSubmit}
              loginUrl={this.props.route.config.loginUrl}
              setAuthState={this.setAuthState} >
                <UserAuth />
            </Header>
          </article>
        </nav>
        <div className="row">
          <div className="col-sm-12">
            {pageContentNode}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 city-list-menu">
            <CityContainer
              cityId={this.state.cityId}
              citiesUrl={this.props.route.config.citiesUrl} />
            </div>
            <div className="col-md-9">
              <CityInfo
                cityId={this.state.cityId}
                userId={this.state.userId}
                citiesUrl={this.props.route.config.citiesUrl} />

              <PostBox
                cityId={this.state.cityId}
                postUrl={this.props.route.config.postUrl}
                citiesPostUrl={this.props.route.config.citiesPostUrl}
                userId={this.state.userId} />
              </div>
            </div>
        </div>
      );
    };

}

export default Main;
