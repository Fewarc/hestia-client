import React, { useState } from "react";
import Config from "../constants/Config";
import { CalendarIcon, BellIcon, ChatAlt2Icon } from "@heroicons/react/outline";
import classNames from "classnames";
import Notification from "./Notification";
import { NotificationType } from "../interfaces/NotificationInterface";

const typesOfNotifications = [
  Config.NOTIFICATION_EVENT,
  Config.NOTIFICATION_MESSAGE,
  Config.NOTIFICATION_NOTIFICATION
];

const iconClass = classNames(
  'w-8',
  'h-8',
  'text-primary'
);

const notificationIcons = {
  [Config.NOTIFICATION_EVENT]: <CalendarIcon className={iconClass}/>,
  [Config.NOTIFICATION_MESSAGE]: <ChatAlt2Icon className={iconClass}/>,
  [Config.NOTIFICATION_NOTIFICATION]: <BellIcon className={iconClass}/>
}

const Notifications: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState({
    notification: false,
    message: false,
    event: false
  });

  const notifications: NotificationType[] = [];

  const closeAllNotifications = (): void => {
    setNotificationsOpen({
      notification: false,
      message: false,
      event: false
    });
  }

  const openNotifications = (type: keyof typeof notificationsOpen): void => {
    closeAllNotifications();
    setNotificationsOpen({ ...notificationsOpen, [type]: true });
  }

  return (
    <div className='flex gap-x-3'>
      {typesOfNotifications.map((type, index) =>
        <Notification
          notifications={notifications}
          icon={notificationIcons[type]} 
          quantity={index}
          onClick={() => openNotifications(type as keyof typeof notificationsOpen)}
          open={notificationsOpen[type as keyof typeof notificationsOpen]}
        />
      )}
    </div>
  );
}

export default Notifications;