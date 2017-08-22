import React, {Component} from "react";
import Link from 'react-router';

class CityListItem extends Component {
  render() {
    console.log(this.props)
    let divImage = {
      backgroundImage : `url(${this.props.imageUrl})`
    };

  return (
    <div className="CityListItem" style={divImage}>
      <Link to={`/cities/${this.props.id}`}>
        <h3 className="cityName">{this.props.name}</h3>
      </Link>
    </div>
  )}
}

export default CityListItem;
