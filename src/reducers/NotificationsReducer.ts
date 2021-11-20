/* eslint-disable import/no-anonymous-default-export */
import ActionTypes from "../constants/ActionTypes";
import { NotificationType } from "../interfaces/NotificationInterface"

const NotificationsState: NotificationType[] = [];

type NotificationAction = 
{ type: typeof ActionTypes.UPDATE_NOTIFICATIONS, payload: NotificationType[] | any } | // TODO: why
{ type: typeof ActionTypes.DELETE_NOTIFICATION, payload: NotificationType }

export default (notifications: NotificationType[] = NotificationsState, action: NotificationAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NOTIFICATIONS: {
      return [ ...action.payload ];
    }

    case ActionTypes.DELETE_NOTIFICATION: {
      return [ ...notifications.filter(notification => notification.id !== action.payload.id && notification.content !== action.payload.content) ];
    }

    default:
      return notifications;
  }
}