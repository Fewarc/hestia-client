import { ApolloError, useMutation } from "@apollo/client";
import { TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteCachedNotification } from "../actions/NotificationsActions";
import DELETE_NOTIFICATION from "../graphql/mutations/deleteNotification";
import { NotificationType } from "../interfaces/NotificationInterface";
import Button from "./Button";
import Divider from "./Divider";

interface notificationType {
  title: string,
  notifications: NotificationType[],
  icon: JSX.Element,
  quantity: number,
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

const Notification: React.FC<notificationType> = ({
  title,
  notifications,
  icon,
  quantity,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLHeadingElement>(null);
  const [ deleteNotification, { loading, error, data } ] = useMutation(DELETE_NOTIFICATION, { errorPolicy: 'all' });

  useEffect(() => {
    if(error) console.log(JSON.stringify(error, null, 2));
  }, [error]);

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setOpen(false);
  }

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
        content: notification.content
      }
    });
    dispatch(deleteCachedNotification(notification));
  }

  return (
    <div>
      <Button 
        type='link'
        onClick={() => setOpen(true)}
        children={
          <div className='relative'>
            <div>{icon}</div>
            {quantity !== 0 && (<div className={badgeClass}>{quantity}</div>)}
          </div>
        }
      />
      {open && (
        <div className='absolute overflow-auto overflow-x-hidden transform -translate-x-36 flex flex-col bg-white shadow-md px-3 w-80 max-h-64 break-word' ref={node}>
          <div className='flex justify-between'>
            <div className='mb-2'>{title}</div>
            <Button 
              type='transparent'
              onClick={() => null}
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
      )}
    </div>
  );
}

export default Notification;