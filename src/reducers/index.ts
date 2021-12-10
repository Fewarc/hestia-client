import { combineReducers } from "redux";
import alerts from "./AlertsReducer";
import user from "./UserReducer";
import notifications from "./NotificationsReducer";
import messages from "./MessageReducer"
import events from "./EventsReducer"
import notes from "./NotesReducer"

export default combineReducers({
  alerts,
  user,
  notifications,
  messages,
  events,
  notes
});