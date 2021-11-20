import gql from "graphql-tag";

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($content: String!, $deleteNotificationId: Float!) {
    deleteNotification(content: $content, id: $deleteNotificationId)
  }
`;

export default DELETE_NOTIFICATION;