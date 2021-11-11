/* eslint-disable import/no-anonymous-default-export */
import ActionTypes from "../constants/ActionTypes";
import { NotificationType } from "../interfaces/NotificationInterface"

const NotificationsState: NotificationType[] = [];

type NotificationAction = 
{ type: typeof ActionTypes.UPDATE_NOTIFICATIONS, payload: NotificationType[] }

export default (notifications: NotificationType[] = NotificationsState, action: NotificationAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NOTIFICATIONS: {
      return [ ...action.payload ];
    }

    default:
      return notifications;
  }
}