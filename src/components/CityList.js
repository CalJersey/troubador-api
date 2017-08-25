import React, { Component } from "react";
import axios from 'axios';
import CityListItem from './CityListItem'
import CityForm from "./CityForm";

class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    //this.handleCityAdd = this.handleCityAdd.bind(this);
  }

  loadCitiesFromServer(){
    axios.get(this.props.citiesGetUrl)
    .then(res => {
      this.setState({data: res.data})
    })
  }

  componentDidMount() {
    this.loadCitiesFromServer()
  }

  render(){
    let cityNodes = this.state.data.map(city => {
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
    <div className="CityList">
      <div className="CityListItemParent">
        {cityNodes}
      </div>
    </div>
  )}
}

export default CityList;
