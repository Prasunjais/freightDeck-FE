import React, { Component } from "react";
import { handleErrorResponse } from "../../utils/Request";
import message from "antd/lib/message";
import "./login.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import history from "../../history";
import PropTypes from "prop-types";
import { doLogin } from "../../services/loginServices";
import { setAuthToken, firstTimeLoggin } from "../../utils/Auth";
import { Radio } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const options = [
  { label: 'Contractor', value: 'contractor' },
  { label: 'Transporter', value: 'transporter' }
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
      password: "",
      userType: ""
    };
  }

  blur = (e) => {
    e.target.blur();
  }

  onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  onChange = (e) => {
    this.setState({
      userType: e.target.value,
    });
  };

  // prasun.jaiswal@waycool.in 23506795
  submitFromFunction = async (e) => {
    e.preventDefault();
    const { email, password, userType } = this.state;
    this.setState({ loading: true });
    // loginAction(formData)

    await doLogin({ email: email, password: password, userType: userType })
      .then((res) => {
        if (res.data.data.token) {
          this.setState({ loading: false });
          setAuthToken(res.data.data.token);
          window.location = "/contract/list";
          history.push({
            pathname: `/contract/list`,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        const { errorMessage, errors } = handleErrorResponse(err);
        message.error(errorMessage);
      });
  };

  render() {
    let { loading, userType } = this.state;
    return (
      <div className="container-fluid mt-5 px-5">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="login-wrapper">
            <Spin indicator={antIcon} spinning={loading}>
              <form className="form" onSubmit={(e) => this.submitFromFunction(e)}>
                <h2>FreightDeck Contract Portal</h2>
                <p className="title">Login</p>
                <input
                  name="email"
                  className="textInput"
                  placeholder="Email"
                  type="email"
                  onChange={this.onChangeHandler}
                />
                <br />
                <input
                  name="password"
                  className="textInput"
                  placeholder="Password"
                  type="password"
                  onChange={this.onChangeHandler}
                />
                <br />
                <Radio.Group
                  options={options}
                  onChange={this.onChange}
                  value={userType}
                  optionType="button"
                  className="radioUserType"
                />
                <br />
                <button className="login-button" onClick={(e) => this.blur(e)} type="submit">Login</button>
              </form>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Login;
