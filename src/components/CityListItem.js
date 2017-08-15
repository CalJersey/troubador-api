import React, {Component} from "react";

class CityListItem extends Component {
  render() {
    return (
      <div>

        <div className="city-list">

          <h2>Select a Destination!</h2>
          <hr></hr>
          <br></br>

          <ul>
            <li>London</li>
            <li>Gibraltar</li>
            <li>Rome</li>
          </ul>

        </div>
      </div>
    )
  }
}

export default CityListItem;
