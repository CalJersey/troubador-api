import React, { Component } from "react";
import CityListItem from './CityListItem'
import CityForm from "./CityForm";

class CityList extends Component {

  render(){
    let cityNodes = this.props.data.map(city => {
    return (
      <CityListItem
        name={city.name}
        description={city.description}
        id={city['_id']}
        key={city['_id']}
        imageUrl={city.imageUrl}
        citiesViewUrl={this.props.citiesViewUrl} />
    )
  });
  return(
    <div className="cityList">
      {cityNodes}
    </div>
  )}
}

export default CityList;
