import generateActionTypes from "../utils/generateActionTypes";

export const actionTypes = generateActionTypes(
  "LOGGED_IN",
  "LOGGED_OUT",
  "PROFILE_DATA",
  "LOG_IN_STATUS"
);

// user profile data
export function userProfileData(profileData) {
  return (dispatch) => {
    return dispatch({ type: actionTypes.PROFILE_DATA, profileData });
  };
}

// logging in user
export function loggedIn() {
  console.log("action");
  return (dispatch) => {
    return dispatch({ type: actionTypes.LOGGED_IN });
  };
}

// // logout user
export function loggedOut() {
  return (dispatch) => {
    return dispatch({ type: actionTypes.LOGGED_OUT });
  };
}

// // update login status
export function updateLoginStatus(status) {
  return (dispatch) => {
    return dispatch({ type: actionTypes.LOG_IN_STATUS, status });
  };
}
