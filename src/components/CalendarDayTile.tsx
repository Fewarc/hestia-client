import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Event } from "../types/EventType";

interface CalendarDayInterface {
  day: number,
  events: Event[] | undefined
}

const CalendarDayTile: React.FC<CalendarDayInterface> = ({
  day,
  events
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
      "border-primary": !!events?.length,
      "text-primary": !!events?.length,
      "opacity-40": !!events?.length
    }
  );
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

console.log(events);


  return (
    <div className={containerClass} onClick={() => setEventCardOpen(true)}>
      {events && 
        <div className='absolute top-0 left-2'>
          {events.map((event: Event) => 
            <div>
              {event.eventName}
            </div>
          )}
        </div>
      }
      {/* {eventCardOpen && <EventCard />} */}
      <div className='absolute bottom-0 right-0 text-7xl font-extralight'>
        {day}
      </div>
    </div>
  );
}

export default CalendarDayTile;