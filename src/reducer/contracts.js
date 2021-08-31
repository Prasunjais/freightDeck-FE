import { actionTypes } from "../action/contracts";
const {
  CONTRACT_LIST
} = actionTypes;

const initialState = {
  contractList: []
};

export default function contracts(state = initialState, action) {
  switch (action.type) {
    case CONTRACT_LIST:
      return {
        ...state, contractList: [action.contractList]
      };

    default:
      return state;
  }
}
