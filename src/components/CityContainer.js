import React, { Component } from "react";
import CityList from './CityList';
import CityInfo from "./CityInfo";
import CityForm from "./CityForm";


class CityContainer extends Component {
  constructor(){
    super();
    this.state = {data: []};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(e);
    let city = this.state.data;
    let newCity = city.concat(e);
    this.setState({data: newCity});
    console.log(this.props.url);

    fetch(this.props.citiesGetUrl, {
    method: 'post',
    body: e})
    .then(res => {
      this.setState({ data: res.data });
    })
    .catch(err => {
      console.error("OOPSIES", err);
    });
  }
  render() {
    return (
      <div className="CityContainer">
        <div className="city-add">
          <CityForm onCitySubmit={this.handleSubmit}/>
        </div>
        <CityList
          cityId={this.props.cityId}
          citiesViewUrl={this.props.citiesViewUrl}
          citiesGetUrl={this.props.citiesGetUrl}/>
      </div>
    );
  }
}

export default CityContainer;
