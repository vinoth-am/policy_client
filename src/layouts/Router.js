import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/Home";
import Chart from "../pages/Chart/Chart";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path={"/chart"}>
        <Chart />
      </Route>
    </Switch>
  );
};

export default Router
