import { combineReducers } from "redux";

import user from "./user";
import contracts from "./contracts";

export default combineReducers({
  user, contracts
});
