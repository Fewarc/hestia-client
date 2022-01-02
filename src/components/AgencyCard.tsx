import { AtSymbolIcon, LocationMarkerIcon, UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import { UserType } from "../interfaces/UserInterface";
import Button from "./Button";

interface AgencyCardProps {
  className?: string,
  agency: UserType
}

const rowClass = classNames(
  'flex items-center'
);

const iconClass = classNames(
  'h-6 w-6',
  'inline',
  'text-primary',
  'mr-1'
);

const AgencyCard: React.FC<AgencyCardProps> = ({
  className,
  agency
}) => {
  if (!agency.firstName) return null;
  const imageLink: string = `https://avatars.dicebear.com/api/initials/${agency.firstName.replaceAll(' ', '.')}.svg`;

  return (
    <div className={className}>
      <div className="w-full flex my-2 rounded-md shadow-md">
        <div className='h-40'>
          <img src={imageLink} alt='agency_image' className="h-full w-full max-w-xxs rounded-l-md"/>
        </div>
        <div className="flex-grow p-3 flex flex-col justify-evenly">
          <div>
            <Button 
              type='transparent'
              onClick={() => null}
              children={<div className="font-black text-lg">{agency.firstName}</div>}
            />
          </div>
          <div className={rowClass}><LocationMarkerIcon className={iconClass}/>{agency.address}</div>
          <div className={rowClass}><UserIcon className={iconClass}/>@{agency.login}</div>
          <div className={rowClass}><AtSymbolIcon className={iconClass}/>{agency.email}</div>
        </div>
      </div>
    </div>
  );
}

export default AgencyCard;