import React, { Component } from "react";
import axios from 'axios';

class CityInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  loadCityFromServer(){
    axios.get(`${this.props.citiesUrl}${this.props.cityId}`)
    .then(res => {
      this.setState({data: res.data})
      console.log('p',res.data  )
    })
  }
  componentDidMount() {
    this.loadCityFromServer()
  }

  render() {
    return (
      <div className="CityInfo">
        <h2>{this.state.data.name}</h2>
        <div className="image-space">
          <img src={this.state.data.imageUrl} height="75%" width="75%" align="middle" />
        </div>
      </div>
    );
  }
}

export default CityInfo;
