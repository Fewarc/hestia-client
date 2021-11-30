import classNames from "classnames";
import React from "react";

interface CalendarDayInterface {
  day: number
}

const containerClass = classNames(
  'relative',
  'rounded-md',
  'cursor-pointer',
  'border border-gray-600 border-opacity-10',
  'hover:border-primary hover:border-opacity-100',
  'text-gray-600 text-opacity-10',
  'hover:text-primary hover:text-opacity-100'
);

const CalendarDayTile: React.FC<CalendarDayInterface> = ({
  day
}) => {
  return (
    <div className={containerClass}>
      <div className='absolute bottom-0 right-0 text-7xl font-extralight'>
        {day}
      </div>
    </div>
  );
}

export default CalendarDayTile;