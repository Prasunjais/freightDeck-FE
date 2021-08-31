import React, { Component } from "react";
import "./App.scss";
import history from "./utils/History";
import { Routes } from "./routes";
import "antd/dist/antd.css";
import { getAuthToken, loginStatus } from "../src/utils/Auth.js";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  redirectAfterLogin = () => {
    if (this.state.isLoggedIn) {
      window.location = "/contract/list";
      history.push({
        pathname: `/contract/list`,
      });
    }
    else {
      window.location = "/login";
      history.push({
        pathname: `/login`,
      });
    }
  };

  componentDidMount = () => {
    // check local storage for token
    let status = loginStatus();

    this.setState(
      {
        isLoggedIn: status,
      }
    );
  };


  render() {
    const { isLoggedIn } = this.state;
    return (
      <Routes
        isLoggedIn={isLoggedIn}
        redirectAfterLogin={this.redirectAfterLogin}
      />
    );
  }
}
export default App;
