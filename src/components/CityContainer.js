import React, { Component } from "react";
import CityList from './CityList';
import CityInfo from "./CityInfo";
import CityForm from "./CityForm";


class CityContainer extends Component {
  render() {
    return (
      <div className="CityContainer">
        <CityList
          cityId={this.props.cityId}
          citiesViewUrl={this.props.citiesViewUrl}
          citiesGetUrl={this.props.citiesGetUrl}/>
        <div className="city-add">
          <CityForm onCitySubmit={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default CityContainer;
