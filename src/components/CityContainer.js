import React, { Component } from "react";
import CityList from './CityList'
import CityInfo from "./CityInfo";


class CityContainer extends Component {
  render() {
    return (
      <div className="city-main">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
          <CityList />
          </div>
          </div>
          </div>
      </div>
    );
  }
}

export default CityContainer;
