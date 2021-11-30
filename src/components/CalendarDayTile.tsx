import classNames from "classnames";
import React from "react";
import { Event } from "../types/EventType";

interface CalendarDayInterface {
  day: number,
  event: Event | undefined
}

const CalendarDayTile: React.FC<CalendarDayInterface> = ({
  day,
  event
}) => {
  const containerClass = classNames(
    'relative',
    'rounded-md',
    'cursor-pointer',
    'border border-gray-600',
    'hover:border-primary',
    'text-gray-600',
    'hover:text-primary',
    'opacity-20',
    'hover:opacity-100',
    {
      "border-primary": !!event,
      "text-primary": !!event,
      "opacity-40": !!event
    }
  );

  return (
    <div className={containerClass}>
      {event && <div className='absolute top-0 left-0'>
        {event.eventName}
      </div>}
      <div className='absolute bottom-0 right-0 text-7xl font-extralight'>
        {day}
      </div>
    </div>
  );
}

export default CalendarDayTile;