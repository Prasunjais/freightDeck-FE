import axios from "axios";
import { api as APIConfig } from "../../appConfig";
import { getAuthToken } from "../../utils/Auth";
//Verify the credentials for login

export const getContractsList = async (page, search) => {
  let request = await axios.get(
    APIConfig.base_url + `api/v1/contracts?page=${page}&search=`,
    {
      headers: {
        "x-access-token": getAuthToken()
      },
    }
  );
  return request;
};

export const SubmitBid = async (biddingAmount, contractId) => {
  let request = await axios.post(
    APIConfig.base_url + `api/v1/contracts/${contractId}/bid`,
    {
      'bidAmount': biddingAmount
    },
    {
      headers: {
        "x-access-token": getAuthToken()
      },
    }
  );
  return request;
}