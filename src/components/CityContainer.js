import React, { Component } from "react";
import axios from 'axios';
import CityList from './CityList';
import CityForm from "./CityForm";


class CityContainer extends Component {
  constructor(){
    super();
    this.state = {data: []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadCitiesFromServer = this.loadCitiesFromServer.bind(this);
  }

  loadCitiesFromServer(){
    axios.get(this.props.citiesGetUrl)
    .then(res => {
      this.setState({data: res.data})
    })
  }

  handleSubmit(e) {
    // console.log(e);
    let city = this.state.data
    let newCity = e

    axios
      .post(this.props.citiesGetUrl,newCity)
      .then(res => {
      // this.setState({ data: res.data });'
      newCity['_id'] = res.data['_id']
      city.shift(newCity)
      this.loadCitiesFromServer()
    })
    .catch(err => {
      console.error("OOPSIES", err);
    });
  }

  componentDidMount() {
    this.loadCitiesFromServer()
  }

  render() {
    return (
      <div className="cityContainer">
        <CityForm onCitySubmit={this.handleSubmit}/>

        <CityList
          cityId={this.props.cityId}
          citiesViewUrl={this.props.citiesViewUrl}
          citiesGetUrl={this.props.citiesGetUrl}
          data={this.state.data} />
      </div>
    );
  }
}

export default CityContainer;
