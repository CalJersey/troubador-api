import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./Routes.js";
import './MainStyle.css'

//ReactDOM.render(<Main />, document.getElementById("root"));

ReactDOM.render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById("root")
);
