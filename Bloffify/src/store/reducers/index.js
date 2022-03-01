import loggedReducer from "./isLoggedIn";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  logged: loggedReducer,
});

export default allReducers;
