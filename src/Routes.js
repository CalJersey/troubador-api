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
  loginUrl: 'http://localhost:3001/login/',
  defaultPageContext : "",
  isAuthenticated : false,
  defaultCityId : '5994aa8f5f5b9e81335aa930',
  defaultUserId: 1
}
var routes = (
  <div>
        <Route path="/" component={Splash} config={config} />
        <Route path="/signup" component={Signup}  config={config}/>
        <Route path="/cities/:id" component={Main} config={config}/>
        <Route path="/user/:id" component={UserProfile}  config={config}/>
        <Route path="*" component={Main} config={config} />
  </div>
);

export default routes;
