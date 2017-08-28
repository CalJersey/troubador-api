import React, { Component } from "react";

class PageContent extends Component {

  renderpageContent(){
    let displayMessageNode = null;
    if (this.state.pageDisplayMessage){
      displayMessageNode = this.pageDisplayMessage();
    }
    return(
      <div className="pageContent">
        {this.props.pageContext}
        {displayMessageNode}
      </div>
    )
  }

  renderPageDisplayMessage(){
    return(
      <div className="displayMessageNode">
        {this.props.displayMessageNode}
      </div>
    )
  }

  render() {
    let pageContentNode = null;
    if (this.state.pageContext){
      pageContentNode = this.renderpageContent();
    } else {
      if (this.state.pageDisplayMessage){
        pageContentNode = this.pageDisplayMessage();
      }
    }
    return (
      {pageContentNode}
    );
  }
}

export default PageContent;
