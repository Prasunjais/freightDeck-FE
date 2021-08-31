import { actionTypes } from "../action/user";
const {
  LOGGED_IN, LOGGED_OUT, LOG_IN_STATUS, PROFILE_DATA, SCROLL_TO_TOP
} = actionTypes;

const initialState = {
  profileDetails: {},
  // isLoggedIn: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case PROFILE_DATA:
      return { ...state, profileDetails: { ...action.profileData } };
    case LOG_IN_STATUS:
      return { ...state, isLoggedIn: action.status }
    case LOGGED_IN:
      return { ...state, isLoggedIn: true }
    case LOGGED_OUT:
      return { ...state, isLoggedIn: false }
   

    default:
      return state;
  }
}
