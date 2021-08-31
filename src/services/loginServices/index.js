import axios from "axios";
import { api as APIConfig } from "../../appConfig";
import { getAuthToken } from "../../utils/Auth";
//Verify the credentials for login

export const doLogin = async (inputs) => {
  let request = await axios.post(
    APIConfig.base_url + "v1/user/login",
    {
      ...inputs,
    }
  );

  // returning the request
  return request;
};

// forget password
export const forgetPassword = async (inputs) => {
  let request = await axios.post(
    APIConfig.base_url + "v1/user/password/forget",
    {
      ...inputs,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // returning the request
  return request;
};

// verify reset password
export const verifyResetToken = async (inputs) => {
  let request = await axios.delete(
    APIConfig.base_url + `v1/user/forget-password/email/${inputs.email}/token/${inputs.token}`
  );

  // returning the request
  return request;
};

// verify reset password
export const resetPassword = async (inputs, params) => {
  let request = await axios.patch(
    APIConfig.base_url + `v1/user/email/${params.email}/password/reset/token/${params.token}`, {
    ...inputs
  }
  );

  // returning the request
  return request;
};

export const resetPasswordForFirstTime = async (inputs) => {
  let request = await axios.patch(
    APIConfig.base_url + `api/v1/user/password/reset/`, {
    ...inputs
  },
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getAuthToken(),
      }
    }
  );

  // returning the request
  return request;
};
