import React, { useEffect, useState } from "react";
import { CalendarIcon, BellIcon, ChatAlt2Icon } from "@heroicons/react/outline";
import classNames from "classnames";
import Notification from "./Notification";
import { useLazyQuery, useSubscription } from "@apollo/client";
import NEW_NOTIFICATION from "../graphql/subscriptions/newNotification";
import { useDispatch, useSelector } from "react-redux";
import { updateNotifications } from "../actions/NotificationsActions";
import { getNotifications } from "../selectors/NotificationsSelector";
import { NotificationType, typeOfNotification } from "../interfaces/NotificationInterface";
import GET_USER_NOTIFICATIONS from "../graphql/queries/getUserNotifications";

const iconClass = classNames(
  'w-8',
  'h-8',
  'text-primary'
);

interface notificationsObject {
  notifications: NotificationType[],
  messages: NotificationType[],
  events: NotificationType[]
}

const Notifications: React.FC<{ userId: string }> = ({
  userId
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState({
    notification: false,
    message: false,
    event: false
  });
  const dispatch = useDispatch();
  const [ getUserNotifications, { data: userNotifications } ] = useLazyQuery(GET_USER_NOTIFICATIONS, { errorPolicy: 'all' });
  const { data } = useSubscription(NEW_NOTIFICATION, { variables: { userId: parseInt(userId) } });
  const { notifications, messages, events } = useSelector<notificationsObject, notificationsObject>(state => getNotifications(state));

  useEffect(() => {
    getUserNotifications({ variables: { userId: parseInt(userId) } });
    if(userNotifications) dispatch(updateNotifications(userNotifications.getUserNotifications));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNotifications]);

  useEffect(() => {
    if(data) dispatch(updateNotifications(data.newNotification));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      <Notification
        notifications={events}
        icon={<CalendarIcon className={iconClass}/>} 
        quantity={events.length}
        onClick={() => openNotifications(typeOfNotification.EVENT)}
        open={notificationsOpen.event}
      />
      <Notification
        notifications={messages}
        icon={<ChatAlt2Icon className={iconClass}/>} 
        quantity={messages.length}
        onClick={() => openNotifications(typeOfNotification.MESSAGE)}
        open={notificationsOpen.message}
      />
      <Notification
        notifications={notifications}
        icon={<BellIcon className={iconClass}/>} 
        quantity={notifications.length}
        onClick={() => openNotifications(typeOfNotification.NOTIFICATION)}
        open={notificationsOpen.notification}
      />
    </div>
  );
}

export default Notifications;