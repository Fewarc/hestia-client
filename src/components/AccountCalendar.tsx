import { useLazyQuery } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GET_USER_CALENDAR from "../graphql/queries/getUserCalendar";
import { getDayNames, getEmptyDays } from "../utility/CalendarUtils";
import Button from "./Button";
import CalendarDayTile from "./CalendarDayTile";

interface ClaendarInterface {
  userId: number
}

const iconClass = classNames(
  'w-10 h-10',
  'text-primary'
);

const AccountClendar: React.FC<ClaendarInterface> = ({
  userId
}) => {
  const { t } = useTranslation();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [ getCalendar, { data, loading, error } ] = useLazyQuery(GET_USER_CALENDAR, { errorPolicy: 'all' });

console.log(data);


  useEffect(() => { 
    if (!data) {
      getCalendar({
        variables: {
          year: year,
          userId: userId
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleMonthChange = (increment: number): void => {
    if (month + increment > 11) {
      setMonth(0);
    } else {
      if (month + increment < 0) {
        setMonth(12)
      } else {
        setMonth(month + increment);
      }
    } 
  } 


  console.log(month);
  console.log(getEmptyDays(month, year));
  
  return (
    <div className='w-full h-full pt-20 flex flex-col'>
      <div className='flex flex-grow'>
        <Button 
          type='transparent'
          onClick={() => handleMonthChange(-1)}
          children={<ChevronLeftIcon className={iconClass} />}
        />
        <div className='flex flex-col'>
          <div className='flex justify-evenly'>
            <div className='flex items-center'>
              <Button 
                type='transparent'
                onClick={() => setYear(year - 1)}
                children={<ChevronLeftIcon className={iconClass} />}
              />
              <div>{year}</div>
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
          <div className='flex-grow grid grid-cols-7 grid-rows-5 gap-2'>
            {getEmptyDays(month, year).map(_empty => <div></div>)}
            {data?.getUserCalendar?.calendar[month].map((day: number) => <CalendarDayTile day={day} />)}
          </div>
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