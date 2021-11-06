import classNames from "classnames";
import React from "react";
import { NotificationType } from "../interfaces/NotificationInterface";
import Button from "./Button";

interface notificationType {
  notifications: NotificationType[],
  icon: JSX.Element,
  quantity: number,
  onClick: () => void,
  open: boolean
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
  notifications,
  icon,
  quantity,
  onClick,
  open
}) => {
  return (
    <div className={`${!quantity && 'opacity-20'}`}>
      <Button 
        type='link'
        onClick={onClick}
        children={
          <div className='relative'>
            <div>{icon}</div>
            {quantity !== 0 && (<div className={badgeClass}>{quantity}</div>)}
          </div>
        }
      />
      {open && (
        <div>
          {notifications.map(notification => (
            <div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;