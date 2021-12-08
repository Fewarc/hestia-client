import { gql } from "@apollo/client";

const ACCEPT_EVENT_INVITE = gql`
  mutation AcceptEventInvite($userId: Float!, $eventId: Float!, $notificationId: Float!) {
    acceptEventInvite(userId: $userId, eventId: $eventId, notificationId: $notificationId) {
      id
      senderId
      targetId
      content
      type
      seen
    }
  }
`;

export default ACCEPT_EVENT_INVITE;