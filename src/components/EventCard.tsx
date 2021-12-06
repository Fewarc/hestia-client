import React from "react";

interface EventCardInterface {
  events: Event[] | undefined
}

const EventCard: React.FC<EventCardInterface> = ({
  events
}) => {
  return (
    <div className='absolute'>

    </div>
  );
}

export default EventCard;