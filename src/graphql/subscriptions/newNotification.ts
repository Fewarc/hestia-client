import gql from "graphql-tag";

const NEW_NOTIFICATION = gql`
  subscription Subscription($userId: Float!) {
    newNotification(userId: $userId) {
      id
      userId
      content
      type
    }
  }
`;

export default NEW_NOTIFICATION;