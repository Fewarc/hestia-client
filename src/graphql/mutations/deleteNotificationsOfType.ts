import { gql } from "@apollo/client";

const DELETE_NOTIFICATIONS_OF_TYPE = gql`
  mutation DeleteAllNotifications($type: String!, $userId: Float!) {
    deleteAllNotifications(type: $type, userId: $userId) {
      id
      userId
      content
      type
      seen
    }
  }
`;

export default DELETE_NOTIFICATIONS_OF_TYPE;