import { gql } from "@apollo/client";

const GET_EVENT_INVITES = gql`
  query GetPendingEventInvites($eventId: Float!) {
    getPendingEventInvites(eventId: $eventId) {
      id
      senderId
      targetId
      content
      type
      seen
    }
  }
`;

export default GET_EVENT_INVITES;