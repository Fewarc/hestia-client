import { ApolloError, useQuery } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import GET_USER_CALENDAR from "../graphql/queries/getUserCalendar";
import { Event } from "../types/EventType";
import { getDayNames, getEmptyDays } from "../utility/CalendarUtils";
import Button from "./Button";
import CalendarDayTile from "./CalendarDayTile";

interface CalendarInterface {
  userId: number
}

const iconClass = classNames(
  'w-10 h-10',
  'text-primary'
);

const AccountClendar: React.FC<CalendarInterface> = ({
  userId
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const { data, loading, error, refetch: refetchCalendar } = useQuery(GET_USER_CALENDAR, {
    variables: {
      year: year,
      userId: userId
    },
    errorPolicy: 'all'
  });

  useEffect(() => {
    if(error) {
      dispatch(pushAlert({
        type: Config.ERROR_ALERT,
        message: new ApolloError(error).message
      }));
      console.log(JSON.stringify(error, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => { 
    if (!data) {
      refetchCalendar();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleMonthChange = (increment: number): void => {
    if (month + increment > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      if (month + increment < 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month + increment);
      }
    } 
  } 

  return (
    <div className='w-full h-full pt-20 flex flex-col'>
      <div className='flex flex-grow'>
        <Button 
          type='transparent'
          onClick={() => handleMonthChange(-1)}
          children={<ChevronLeftIcon className={iconClass} />}
        />
        <div className='flex flex-col w-full'>
          <div className='flex justify-evenly'>
            <div className='flex items-center'>
              <Button 
                type='transparent'
                onClick={() => setYear(year - 1)}
                children={<ChevronLeftIcon className={iconClass} />}
              />
              <div>{year} / {month + 1}</div>
              <Button 
                type='transparent'
                onClick={() => setYear(year + 1)}
                children={<ChevronRightIcon className={iconClass} />}
              />
            </div>
          </div>
          <div className='grid grid-cols-7 text-3xl text-gray-600 text-opacity-10 text-center font-black mt-8 mb-2'>
            {getDayNames(t).map(dayName => <div>{dayName}</div>)}
          </div>
          {loading ? 
          <div className='flex-grow grid grid-cols-7 grid-rows-5 gap-2 mb-10'>
          {[ ...Array(35) ].map(() => 
            <div className='w-full h-full bg-gray-100 rounded-md animate-pulse'></div>
          )}
          </div> :
          <div className='flex-grow grid grid-cols-7 grid-rows-5 gap-2 mb-10'>
            {getEmptyDays(month, year).map(() => <div></div>)}
            {data?.getUserCalendar?.calendar[month].map((day: number, index: number) => 
              <CalendarDayTile 
                day={day} 
                month={month}
                year={year}
                position={getEmptyDays(month, year).length + index + 1}
                events={data.getUserCalendar.events.filter((event: Event) => (
                  event.year === year && 
                  event.month === month && 
                  event.day === day + 1
                ))}
                calendarEventsUpdate={() => refetchCalendar()}
              />
            )}
          </div>}
        </div>
        <Button 
          type='transparent'
          onClick={() => handleMonthChange(1)}
          children={<ChevronRightIcon className={iconClass} />}
        />
      </div>
    </div>
  );
}

export default AccountClendar;