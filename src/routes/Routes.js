import React, { Component } from "react";
import Dashboard from "../container/dashboardMain";
import Login from "../container/login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
class Routes extends Component {
  render() {
    return (

      <Switch>
        <Route
          path="/login"
          exact
          render={(props) =>
            this.props.isLoggedIn ? (
              this.props.redirectAfterLogin()
            ) : (
              <Login {...props} />
            )
          }
        />
        <Route exact strict path="/contract/*" component={Dashboard} />
        <Redirect from="*" to="/login" />
      </Switch>
    );
  }
}

export default Routes;
