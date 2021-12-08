/* eslint-disable import/no-anonymous-default-export */
import ActionTypes from "../constants/ActionTypes";
import { NotificationType, typeOfNotification } from "../interfaces/NotificationInterface";

const NotificationsState: NotificationType[] = [];

type NotificationAction = 
{ type: typeof ActionTypes.UPDATE_NOTIFICATIONS, payload: NotificationType[] | any } | // TODO: why?
{ type: typeof ActionTypes.DELETE_NOTIFICATION, payload: NotificationType } |
{ type: typeof ActionTypes.DELETE_ALL_NOTIFICATIONS, payload: typeOfNotification } |
{ type: typeof ActionTypes.MARK_AS_SEEN, payload: typeOfNotification }

export default (notifications: NotificationType[] = NotificationsState, action: NotificationAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NOTIFICATIONS: {
      return [ ...action.payload ];
    }

    case ActionTypes.DELETE_NOTIFICATION: {
      return [ ...notifications.filter(notification => notification.id !== action.payload.id && notification.content !== action.payload.content) ];
    }

    case ActionTypes.DELETE_ALL_NOTIFICATIONS: {
      return [ ...notifications.filter(notification => notification.type !== action.payload.toUpperCase()) ]
    }

    case ActionTypes.MARK_AS_SEEN: {
      return []; // might finish later
    }

    default:
      return notifications;
  }
}