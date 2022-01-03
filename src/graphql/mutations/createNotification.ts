import { gql } from "@apollo/client";

const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($senderId: Float!, $targetId: Float!, $content: String!, $type: String!) {
    createNotification(senderId: $senderId, targetId: $targetId, content: $content, type: $type) {
      id
      senderId
      targetId
      content
      type
    }
  }
`;

export default CREATE_NOTIFICATION;