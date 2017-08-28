import React from "react";
import { Route } from "react-router";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Splash from "./components/Splash";
import UserProfile from "./components/UserProfile";

let config = {
  postGetUrl : 'http://localhost:3001/api/posts/',
  citiesPostUrl : 'http://localhost:3001/api/posts/cities/',
  citiesGetUrl : 'http://localhost:3001/api/cities/',
  citiesViewUrl: '/cities/',
  postViewUrl: '/posts/',
  loginUrl: 'http://localhost:3001/api/login/',
  logoutUrl: 'http://localhost:3001/api/logout/',
  signupUrl:'http://localhost:3001/api/signup',
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
