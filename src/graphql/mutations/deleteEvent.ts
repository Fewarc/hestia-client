import { gql } from "@apollo/client";

const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: Float!) {
    deleteEvent(eventId: $eventId)
  }
`;

export default DELETE_EVENT;