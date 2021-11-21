import { ApolloError, useMutation } from "@apollo/client";
import { TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import { deleteAllNotifications, deleteSingleNotification, updateNotifications } from "../actions/NotificationsActions";
import Config from "../constants/Config";
import DELETE_NOTIFICATION from "../graphql/mutations/deleteNotification";
import DELETE_NOTIFICATIONS_OF_TYPE from "../graphql/mutations/deleteNotificationsOfType";
import { NotificationType, typeOfNotification } from "../interfaces/NotificationInterface";
import Button from "./Button";
import Spinner from "./Spinner";

interface notificationType {
  title: string,
  notifications: NotificationType[],
  icon: JSX.Element,
  quantity: number,
  userId: number
}

const badgeClass = classNames(
  'absolute',
  'w-4',
  'h-4',
  'text-xs',
  'text-primary',
  'font-bold',
  '-bottom-1',
  '-right-1',
  'rounded-full',
  'bg-white',
  'shadow-md'
);

const dropClass = classNames(
  'absolute',
  'overflow-auto',
  'overflow-x-hidden',
  'transform',
  '-translate-x-36',
  'flex flex-col',
  ' bg-white',
  'shadow-md',
  'px-3',
  'w-80',
  'max-h-64',
  'break-word'
);  

const Notification: React.FC<notificationType> = ({
  title,
  notifications,
  icon,
  quantity,
  userId
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLHeadingElement>(null);
  const dropNode = useRef<HTMLHeadingElement>(null);
  const [ deleteNotification, { loading: singleLoading, error: singleError, data: singleData } ] = useMutation(DELETE_NOTIFICATION, { errorPolicy: 'all' });
  const [ deleteNotificationsOfType, { loading: allLoading, error: allError, data: allData } ] = useMutation(DELETE_NOTIFICATIONS_OF_TYPE, { errorPolicy: 'all' });
  const notifiactionType: typeOfNotification = title.slice(0, -1) as typeOfNotification;

  useEffect(() => {
    if(singleError) dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(singleError).message
    }));
    if(allError) dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(allError).message
    }));
  }, [singleError, allError]);

  useEffect(() => {
    if(singleData) dispatch(updateNotifications(singleData.deleteNotification))
    if(allData) dispatch(updateNotifications(allData.deleteAllNotifications))
  }, [singleData, allData]);

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setOpen(false);
  }

  useEffect(() => {
    console.log(dropNode.current);
  }, [dropNode]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeNotification = (notification: NotificationType): void => {
    deleteNotification({
      variables: {
        deleteNotificationId: parseInt(notification.id.toString()), // TODO: check why
        content: notification.content,
        userId: userId
      }
    });
  }

  return (
    <div>
      <Button 
        type='link'
        onClick={() => setOpen(true)}
        children={
          <div className='relative'>
            <div>{icon}</div>
            <div className={badgeClass}>{quantity}</div>
          </div>
        }
      />
      {open && (
        <div className={dropClass} ref={node}>
          <div className='relative' ref={dropNode}>
            {(singleLoading || allLoading) && <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-5 -translate-y-5 opacity-100' dimensionsClass='w-10 h-10'/>}
            <div className={`${(singleLoading || allLoading) && 'opacity-20'}`}>
              <div className='flex justify-between'>
                <div className='mb-2'>{title}</div>
                <Button 
                  type='transparent'
                  onClick={() => {
                    deleteNotificationsOfType({
                      variables: {
                        type: notifiactionType,
                        userId: userId
                      }
                    })
                  }}
                  children={t('notifications.clear_all')}
                  className='text-primary'
                />
              </div>
              {!quantity && <div className='flex-grow text-center p-6 opacity-20'>{t(`notifications.no_${title}`)}</div>}
              {notifications.map((notification, index) => (
                <div className={`group flex items-center py-2 text-xs ${!!index && 'border-t border-gray-500 border-opacity-5'}`}>
                  <div className='flex-grow'>
                    {notification.content}
                  </div>
                  <Button 
                    type='transparent'              
                    onClick={() => removeNotification(notification)}
                    children={<TrashIcon className='w-4 h-4 text-primary'/>}
                    className='invisible group-hover:visible'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notification;