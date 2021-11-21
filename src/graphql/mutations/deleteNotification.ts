import gql from "graphql-tag";

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($userId: Float!, $content: String!, $deleteNotificationId: Float!) {
    deleteNotification(userId: $userId, content: $content, id: $deleteNotificationId) {
      id
      userId
      content
      type
      seen
    }
  }
`;

export default DELETE_NOTIFICATION;