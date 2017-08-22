import React from "react";
import { Route } from "react-router";
import Signup from "./components/Signup";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";

let config = {
  postGetUrl : 'http://localhost:3001/api/posts/',
  citiesPostUrl : 'http://localhost:3001/api/posts/cities/',
  citiesGetUrl : 'http://localhost:3001/api/cities/',
  citiesViewUrl: '/cities/',
  postViewUrl: '/posts/',
  loginUrl : '/login',
  defaultPageContext : "",
  isAuthenticated : false,
  defaultCityId : '5994aa8f5f5b9e81335aa930',
  defaultUserId: 1
}
var routes = (
  <div>

        <Route path="/" component={Main} config={config} />
      ] <Route path="/cities/:id" component={Main} config={config}/>
        <Route path="/signup" component={Signup}  config={config}/>
        <Route path="/login" component={Main}  config={config}/>
        <Route path="/user" component={UserProfile}  config={config}/>
  </div>
);

export default routes;
