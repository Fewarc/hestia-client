import { combineReducers } from "redux";
import alerts from "./AlertsReducer";
import user from "./UserReducer";
import notifications from './NotificationsReducer';

export default combineReducers({
  alerts,
  user,
  notifications
});