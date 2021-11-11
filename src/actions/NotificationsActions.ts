import ActionTypes from "../constants/ActionTypes";
import { NotificationType } from "../interfaces/NotificationInterface";

export const updateNotifications = (notifications: NotificationType[]) => {
  try {
    return { type: ActionTypes.UPDATE_NOTIFICATIONS, payload: notifications }
  } catch (error) {
    console.error(error);
  }
}