import { gql } from "@apollo/client";

const INVITE_FOR_EVENT = gql`
  mutation InviteUsersForEvent($content: String!, $eventId: Float!, $userIds: [Float!]!) {
    inviteUsersForEvent(content: $content, eventId: $eventId, userIds: $userIds)
  }
`;

export default INVITE_FOR_EVENT;