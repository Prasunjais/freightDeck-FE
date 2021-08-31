import React, { Component } from "react";
import history from "../../utils/History";
import { handleErrorResponse } from "../../utils/Request";
import { logoutFunction } from '../../utils/Auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import message from "antd/lib/message";
import ContractList from "../../container/ContractList";
import ContractDetails from "../../container/ContractDetails";
import './dashboard.scss';
import {
  LogoutOutlined
} from '@ant-design/icons';

class DashboardMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  logout = () => {
    logoutFunction();
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div className="flex-container row">
            <div className="col-md-12 my-0 ml-1 col-xs-6 right-box">
              <Switch history={history}>
                <Route
                  exact
                  strict
                  path="/contract/list"
                  component={ContractList}
                />
                <Route
                  exact
                  strict
                  path="/contract/details"
                  component={ContractDetails}
                />
              </Switch>
            </div>
          </div>
        </div>
        <div className="logout-button">
          <a onClick={() => this.logout()} ><LogoutOutlined /></a>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardMain;
