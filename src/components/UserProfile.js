import React, { Component } from "react";
import Header from "./Header";
// import CityList from "./CityList";

class UserProfile extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <body className="user-page-body">
    <div classNameName="container">
      <div className="row userContainer">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <img className="user-photo" src="https://a0.muscache.com/im/pictures/965c0643-b59f-4d12-8d91-0ff2a55b21dc.jpg?aki_policy=profile_x_medium"/>
        </div>
        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <h2 className="katherine">Katherine Mongod</h2>
          <p className="userCity">San Francisco, CA</p>
          <ul className="ul-city">
            <li className="userInList">
              <h5 className="katherine-city">San Francisco</h5>
              <p className="city-post-p">
              Wear comfortable shoes. You will be doing a lot of walking on steep hills.
              </p>
            </li>
            <li className="userInList">
                <h5 className="katherine-city">Sydney</h5>
                <p className="city-post-p">
                  NYE in Sydney is an event of a lifetime … try it at least once!
                </p>
            </li>
            <li className="userInList">
              <h5 className="katherine-city">Rio de Janeiro</h5>
              <p className="city-post-p">
                Barriopeixoto, the Art-Deco district in the middle of Copacaban, are breathtakingly beautiful buildings.
              </p>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </body>
        </div>
      </div>
    );
  }
}

export default UserProfile;
