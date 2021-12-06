import { useQuery } from "@apollo/client";
import { PlusCircleIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import GET_USER_EVENTS from "../graphql/queries/getUserEvents";
import { getUserNavbarData } from "../selectors/UserSelector";
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

interface UserData {
  userId: string | undefined,
  username: string | undefined
}

const EventCard: React.FC<EventCardInterface> = ({
  day,
  month,
  year,
  position
}) => {
  const { t } = useTranslation();
  const positionClass = classNames(
    {
      '-translate-x-full mr-2': ( position % 7 ) / 4 === 0 || Math.floor(( position % 7 ) / 4 ) >= 1,
      'translate-x-full right-0 ml-2': Math.floor(( position % 7 ) / 4 ) < 1 && ( position % 7 ) / 4 !== 0,
    }
  );
  const [eventCreation, setEventCreation] = useState(false);
  const { userId } = useSelector<UserData, UserData>(state => getUserNavbarData(state));
  const { data, error, loading, refetch: refetchEvents } = useQuery(GET_USER_EVENTS, {
    variables: {
      year: year,
      month: month,
      day: day + 1,
      userId: userId
    },
    errorPolicy: 'all'
  });

  const handleEventsUpdate = (): void => {

  }
  console.log(data);
  
const events: Event[] = [];
  return (
    <div className={`absolute transform -translate-y-1/2 top-1/2 p-2 w-96 z-50 ${positionClass}`}>
      <div className='w-full h-full p-2 bg-white rounded-md shadow-md flex flex-col'>
        <div className='text-center'>{day}-{month}-{year}</div>
        {data?.getUserEvents?.map((event: Event) => <UserEvent event={event}/>)}
        {!events?.length && <div className='text-center text-gray-200 my-4'>{t('events.no_events')}</div>}
        {eventCreation ? 
        <EventCreationForm 
          day={day}
          month={month}
          year={year}
          userId={userId}
          // onEventsUpdate={}
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