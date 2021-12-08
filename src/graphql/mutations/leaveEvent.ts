import { gql } from "@apollo/client";

const LEAVE_EVENT = gql`
  mutation LeaveEvent($eventId: Float!, $userId: Float!) {
    leaveEvent(eventId: $eventId, userId: $userId)
  }
`;

export default LEAVE_EVENT;