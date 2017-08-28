import React, { Component } from "react";
import Header from "./Header"
import CityContainer from "./CityContainer";
import PageContent from "./PageContent";
import CityInfo from "./CityInfo";
import PostBox from "./PostBox";

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:this.props.params.uId || this.props.route.config.defaultUserId,
      cityId:this.props.params.cid || this.props.route.config.defaultCityId,
      pageContext:this.props.route.config.pageContext,
      PageDisplayMessage:this.props.params.PageDisplayMessage,
    }

  }

  renderPageContent() {
    return(
      <div className="PageContent">
        <PageContent
          pageContext={this.state.pageContext}
          PageDisplayMessage={this.state.PageDisplayMessage}/>
      </div>
    )
  }

render() {
  let pageContentNode=null;
  if (this.state.pageContext || this.state.PageDisplayMessage ){
    pageContentNode=this.renderPageContent();
  }
  return (
    <div className="container-fluid">
      <Header
        isAuthenticated={this.props.route.config.isAuthenticated}
        userId={this.state.userId}
        loginUrl={this.props.route.config.loginUrl} />

      {/* content below heder and above main content (individual header/messages) */}
      {pageContentNode}

      <div className="row">
        <div className="col-md-3 city-list-menu">
          <CityContainer
            cityId={this.state.cityId}
            citiesViewUrl={this.props.route.config.citiesViewUrl}
            citiesGetUrl={this.props.route.config.citiesGetUrl} />
          </div>
          <div className="col-md-9 main-content">
            <CityInfo
              cityId={this.state.cityId}
              userId={this.state.userId}
              citiesViewUrl={this.props.route.config.citiesViewUrl}
              citiesGetUrl={this.props.route.config.citiesGetUrl} />
            <PostBox
              cityId={this.state.cityId}
              postGetUrl={this.props.route.config.postGetUrl}
              citiesPostUrl={this.props.route.config.citiesPostUrl}
              userId={this.state.userId} />
          </div>
        </div>
      </div>
    );
  };
}

export default Main;
