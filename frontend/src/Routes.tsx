import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginComponent from "./modules/user/LoginComponent";
import RegisterComponent from "./modules/user/RegisterComponent";
import Me from "./modules/user/Me";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={RegisterComponent} />
        <Route path="/me" component={Me} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
