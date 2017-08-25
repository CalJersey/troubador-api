import React, { Component } from "react";
import Header from "./Header"
// import {Link} from "react-router";
// import {browserHistory} from "react-router";
import CityContainer from "./CityContainer";
import PageContent from "./PageContent";
import CityInfo from "./CityInfo";
import PostBox from "./PostBox";
import UserAuth from "./UserAuth";

// import { Button, Card, Row, Col, Input } from "react-materialize";

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userId: ,
  //     isAuthenticated: ,
  //     cityId:
  //   };
  // }



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
      <div className="container-fluid">
        <Header
          isAuthenticated={this.props.route.config.isAuthenticated}
          userId={this.props.params.userId || this.props.route.config.defaultUserId}
          loginUrl = {this.props.route.config.loginUrl} />
        <div className="row">
          <div className="col-sm-12">
            {pageContentNode}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 city-list-menu">
            <CityContainer
              cityId={this.props.params.id || this.props.route.config.defaultCityId}
              citiesViewUrl={this.props.route.config.citiesViewUrl}
              citiesGetUrl={this.props.route.config.citiesGetUrl} />
            </div>
            <div className="col-md-9">
              <CityInfo
                cityId={this.props.params.id || this.props.route.config.defaultCityId}
                userId={this.props.params.userId || this.props.route.config.defaultUserId}
                citiesViewUrl={this.props.route.config.citiesViewUrl}
                citiesGetUrl={this.props.route.config.citiesGetUrl} />

              <PostBox
                cityId={this.props.params.id || this.props.route.config.defaultCityId}
                postGetUrl={this.props.route.config.postGetUrl}
                citiesPostUrl={this.props.route.config.citiesPostUrl}
                userId={this.props.params.userId || this.props.route.config.defaultUserId} />
              </div>
            </div>
        </div>
      );
    };

}

export default Main;
