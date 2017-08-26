import React, { Component } from "react";
import "../MainStyle.css";
// import { Link } from "react-router";
// import CityList from "./CityList";
// import { Button, Input } from "react-materialize";
// import $ from "jquery-ajax";
import Header from "./Header";

class Splash extends Component {

  render() {
      return (

        <div className="splash container-fluid">

            <Header
              isAuthenticated={this.props.route.config.isAuthenticated}
              userId={this.props.params.uId || this.props.route.config.defaultUserId}
              loginUrl = {this.props.route.config.loginUrl} />

          <div className="row splash-main">
            <div className="col-md-12 image-splash">

                <div id="left-topic">
                  <div className="topicHead">
                    <h3>Top Cities</h3>
                  </div>
                  <hr />
                  <p>
                    Find tips on a wide range of topics, from where to find
                    historical landmarks to names of the best shopping centers.This
                    is a perfectly tailored website for your next adventure.
                  </p>
                </div>

                <div id="middle-topic">
                  <div className="topicHead">
                    <h3>Destinations</h3>
                  </div>
                  <hr />
                  <p>
                    Our site is jam packed with the information you need for all
                    your travels. Get excited and picture what you will experience.
                  </p>
                </div>

                <div id="right-topic">
                  <div className="topicHead">
                    <h3>Adventures</h3>
                  </div>
                  <hr />
                  <p>
                    Make your life easier and use Wayfarer to plan your next trip.
                    Go explore and discover your next adventure.
                  </p>
                </div>
              </div>
          </div>
        </div>
     );
  }
}

export default Splash;
