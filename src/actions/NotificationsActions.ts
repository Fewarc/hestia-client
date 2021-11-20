import ActionTypes from "../constants/ActionTypes";
import { NotificationType } from "../interfaces/NotificationInterface";

export const updateNotifications = (notifications: NotificationType[]) => {
  return { type: ActionTypes.UPDATE_NOTIFICATIONS, payload: notifications };
}

export const deleteCachedNotification = (notification: NotificationType) => {
  return { type: ActionTypes.DELETE_NOTIFICATION, payload: notification };
}