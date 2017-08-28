import React from "react";
import { Route } from "react-router";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Splash from "./components/Splash";
import UserProfile from "./components/UserProfile";

let config = {
  postGetUrl : 'https://troubador-api.herokuapp.com/api/posts/',
  citiesPostUrl : 'https://troubador-api.herokuapp.com/posts/cities/',
  citiesGetUrl : 'https://troubador-api.herokuapp.com/cities/',
  citiesViewUrl: '/cities/',
  postViewUrl: '/posts/',
  loginUrl: 'https://troubador-api.herokuapp.com/api/login/',
  logoutUrl: 'https://troubador-api.herokuapp.com/logout/',
  signupUrl:'https://troubador-api.herokuapp.com/signup',
  defaultPageContext : "",
  isAuthenticated : false,
  defaultCityId : '599fad8d275cb3ee8a473dbb',
  defaultUserId: 1
}

let routes = (
  <div>
    <Route path="/" component={Splash} config={config} />
    <Route path="/signup" component={Signup} config={config}/>
    <Route path="/cities/:cid" component={Main} config={config}/>
    <Route path="/user/:uid" component={UserProfile}  config={config}/>
    <Route path="*" component={Main} config={config} />
  </div>
);

export default routes;
