import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Event } from "../types/EventType";
import EventCard from "./EventCard";

interface CalendarDayInterface {
  day: number,
  month: number,
  year: number,
  events: Event[] | undefined,
  position: number
}

const containerClass = classNames(
  'group',
  'relative',
  'rounded-md',
  'cursor-pointer',
  'border border-gray-600 border-opacity-20',
  'hover:border-primary',
);

const opacityClass = classNames(
  'text-gray-600',
  'group-hover:text-primary',
  'opacity-20',
  'group-hover:opacity-100',
);

const CalendarDayTile: React.FC<CalendarDayInterface> = ({
  day,
  month,
  year,
  events,
  position
}) => {
  const node = useRef<HTMLHeadingElement>(null);
  const [eventCardOpen, setEventCardOpen] = useState(false);

  const handleClick = (e: any): void => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setEventCardOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={containerClass} onClick={() => setEventCardOpen(true)} ref={node}>
      {events && 
        <div className={`absolute top-0 left-2 ${opacityClass}`}>
          {events.map((event: Event) => 
            <div>
              {event.eventName}
            </div>
          )}
        </div>
      }
      {eventCardOpen && 
        <EventCard 
          day={day}
          month={month}
          year={year}
          events={events} 
          position={position}
        />
      }
      <div className={`absolute bottom-0 right-0 text-7xl font-extralight ${opacityClass}`}>
        {day}
      </div>
    </div>
  );
}

export default CalendarDayTile;