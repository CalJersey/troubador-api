import React from "react";
import {BrowserRouter, hashHistory, Route, Router } from 'react-router-dom';
import { history} from 'react-router';
import Signup from "./components/Signup";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";
import Splash from "./components/Splash";

let config = {
 postUrl : 'http://localhost:3001/api/posts/',
 citiesPostUrl : 'http://localhost:3001/api/posts/cities/',
 citiesUrl : 'http://localhost:3001/api/cities/',
 loginUrl : 'http://localhost:3001/login',
 defaultPageContext : "",
 isAuthenticated : false,
 defaultCityId : '5994aa8f5f5b9e81335aa930',
 defaultUserId: 1
}

let routes = (
  <BrowserRouter config={config}>
    <Route exact path="" component={Splash}>
      <Route exact path="/">
        <Route path="/cities/:id" component={Main}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Main}/>
        <Route path="/user" component={UserProfile}/>
      </Route>
    </Route>
  </BrowserRouter>
);

export default routes;
