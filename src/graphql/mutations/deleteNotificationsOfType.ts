import { gql } from "@apollo/client";

const DELETE_NOTIFICATIONS_OF_TYPE = gql`
  mutation DeleteAllNotifications($type: String!, $targetId: Float!) {
    deleteAllNotifications(type: $type, targetId: $targetId) {
      id
      senderId
      targetId
      content
      type
    }
  }
`;

export default DELETE_NOTIFICATIONS_OF_TYPE;