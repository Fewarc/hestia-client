import { RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";
import { NotificationType, typeOfNotification } from "../interfaces/NotificationInterface";

const getAllNotifications = (state: RootStateOrAny) => state.notifications;

export const getNotifications = createSelector(
  [getAllNotifications],
  (allNotifications) => {
    const notifications = allNotifications.filter((notification: NotificationType) => notification.type.toLowerCase() === typeOfNotification.NOTIFICATION);
    const messages = allNotifications.filter((notification: NotificationType) => notification.type.toLowerCase() === typeOfNotification.MESSAGE);
    const events = allNotifications.filter((notification: NotificationType) => notification.type.toLowerCase() === typeOfNotification.EVENT);

    return {
      notifications,
      messages,
      events
    };
  }
);