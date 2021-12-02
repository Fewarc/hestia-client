import gql from "graphql-tag";

const DELETE_NOTIFICATION = gql`
  mutation Mutation($userId: Float!, $content: String!, $deleteNotificationId: Float!) {
    deleteNotification(userId: $userId, content: $content, id: $deleteNotificationId) {
      id
      senderId
      targetId
      content
      type
      seen
    }
  }
`;

export default DELETE_NOTIFICATION;