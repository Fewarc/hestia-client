import { gql } from "@apollo/client";

const SEND_INVITE = gql`
  mutation SendContactInvite($inviteContent: String!, $targetId: Float!, $senderId: Float!) {
    sendContactInvite(inviteContent: $inviteContent, targetId: $targetId, senderId: $senderId)
  }
`;

export default SEND_INVITE;