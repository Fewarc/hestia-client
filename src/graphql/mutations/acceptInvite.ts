import { gql } from "@apollo/client";

const ACCEPT_INVITE = gql`
  mutation AcceptInvite($targetId: Float!, $userId: Float!, $content: String!, $acceptInviteId: Float!) {
    acceptInvite(targetId: $targetId, userId: $userId, content: $content, id: $acceptInviteId) {
      id
      senderId
      targetId
      content
      type
    }
  }
`

export default ACCEPT_INVITE;