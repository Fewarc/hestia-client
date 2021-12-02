import gql from "graphql-tag";

const NEW_NOTIFICATION = gql`
  subscription Subscription($userId: Float!) {
    newNotification(userId: $userId) {
      id
      senderId
      targetId
      content
      type
      seen
    }
  }
`;

export default NEW_NOTIFICATION;