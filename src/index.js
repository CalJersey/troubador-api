import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Routes from "./Routes.js";
import './MainStyle.css';
import Main from "./components/Main.js";

//ReactDOM.render(<Main />, document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter Routes={Routes}/>,
  document.getElementById("root")
)
