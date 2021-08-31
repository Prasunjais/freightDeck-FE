import generateActionTypes from "../utils/generateActionTypes";

export const actionTypes = generateActionTypes(
  "CONTRACT_LIST"
);

// user profile data
export function contractList(contractList) {
  return (dispatch) => {
    return dispatch({ type: actionTypes.CONTRACT_LIST, contractList });
  };
}