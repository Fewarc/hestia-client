import { gql } from "@apollo/client";

const GET_PENDING_INVITES = gql`
  query GetPendingInvites($userId: Float!) {
    getPendingInvites(userId: $userId) {
      id
      senderId
      targetId
      content
      type
    }
  }
`;

export default GET_PENDING_INVITES