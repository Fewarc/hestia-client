import { combineReducers } from "redux";
import alerts from "./AlertsReducer";
import user from "./UserReducer";
import notifications from "./NotificationsReducer";
import messages from "./MessageReducer"

export default combineReducers({
  alerts,
  user,
  notifications,
  messages
});