import { PlusCircleIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Event } from "../types/EventType";
import Button from "./Button";
import EventCreationForm from "./EventCreationForm";
import UserEvent from "./UserEvent";

interface EventCardInterface {
  day: number,
  month: number,
  year: number,
  events: Event[] | undefined,
  position: number
}

const EventCard: React.FC<EventCardInterface> = ({
  day,
  month,
  year,
  events,
  position
}) => {
  const { t } = useTranslation();
  const [eventCreation, setEventCreation] = useState(false);

  const positionClass = classNames(
    {
      '-translate-x-full mr-2': ( position % 7 ) / 4 === 0 || Math.floor(( position % 7 ) / 4 ) >= 1,
      'translate-x-full right-0 ml-2': Math.floor(( position % 7 ) / 4 ) < 1 && ( position % 7 ) / 4 !== 0,
    }
  );

  return (
    <div className={`absolute transform -translate-y-1/2 top-1/2 p-2 w-96 z-50 ${positionClass}`}>
      <div className='w-full h-full p-2 bg-white rounded-md shadow-md flex flex-col'>
        <div className='text-center'>{day}-{month}-{year}</div>
        {events?.map((event: Event) => <UserEvent event={event}/>)}
        {!events?.length && <div className='text-center text-gray-200 my-4'>{t('events.no_events')}</div>}
        {eventCreation ? 
        <EventCreationForm 
          day={day}
          month={month}
          year={year}
        /> :
        <Button 
          type='transparent'
          onClick={() => setEventCreation(true)}
          children={
            <div className='flex items-center justify-center py-1'>
              <div>{t('events.add_event')}</div>
              <div><PlusCircleIcon className='w-5 h-5 text-primary ml-2'/></div>
            </div>
          }
          className='rounded-md hover:bg-gray-100 w-full'
        />}
      </div>
    </div>
  );
}

export default EventCard;