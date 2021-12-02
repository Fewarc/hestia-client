import { gql } from "@apollo/client";

const GET_PENDING_INVITES = gql`
  query Query($userId: Float!) {
    getPendingInvites(userId: $userId) {
      id
      senderId
      targetId
      content
      type
      seen
    }
  }
`;

export default GET_PENDING_INVITES