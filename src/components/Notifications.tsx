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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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

  return (
    <div className='flex gap-x-3'>
      <Notification
        title={t('notifications.events')}
        notifications={events}
        icon={<CalendarIcon className={iconClass}/>} 
        quantity={events.length}
      />
      <Notification
        title={t('notifications.messages')}
        notifications={messages}
        icon={<ChatAlt2Icon className={iconClass}/>} 
        quantity={messages.length}
      />
      <Notification
        title={t('notifications.notifications')}
        notifications={notifications}
        icon={<BellIcon className={iconClass}/>} 
        quantity={notifications.length}
      />
    </div>
  );
}

export default Notifications;