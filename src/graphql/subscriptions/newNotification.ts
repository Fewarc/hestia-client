import gql from "graphql-tag";

const NEW_NOTIFICATION = gql`
  subscription NewNotification($userId: Float!) {
    newNotification(userId: $userId) {
      type
      content
      targetId
      senderId
      id
    }
  }
`;

export default NEW_NOTIFICATION;