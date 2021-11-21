import ActionTypes from "../constants/ActionTypes";
import { typeOfNotification, NotificationType } from "../interfaces/NotificationInterface"

export const updateNotifications = (notifications: NotificationType[]) => {
  return { type: ActionTypes.UPDATE_NOTIFICATIONS, payload: notifications };
}

export const deleteSingleNotification = (notification: NotificationType) => {
  return { type: ActionTypes.DELETE_NOTIFICATION, payload: notification };
}

export const deleteAllNotifications = (notificationType: typeOfNotification) => {
  return { type: ActionTypes.DELETE_ALL_NOTIFICATIONS, payload: notificationType }
}