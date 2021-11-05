import { combineReducers } from "redux";
import alerts from "./AlertsReducer";
import user from "./UserReducer";

export default combineReducers({
  alerts,
  user
});