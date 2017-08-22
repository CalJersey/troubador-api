import React, {Component} from "react";


class CityListItem extends Component {
  render() {
    console.log(this.props)
    let divImage = {
      backgroundImage : `url(${this.props.imageUrl})`
    };

  return (
    <a href={`${this.props.citiesViewUrl}${this.props.id}`}>
      <div className="CityListItem" style={divImage}>
        <h3 className="cityName">{this.props.name}</h3>
      </div>
    </a>
  )}
}

export default CityListItem;
