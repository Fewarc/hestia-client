import { gql } from "graphql-tag";

const GET_USER_NOTIFICATIONS = gql`
  query GetUserNotifications($userId: Float!) {
    getUserNotifications(userId: $userId) {
      id
      senderId
      targetId
      content
      type
      seen
    }
  }
`

export default GET_USER_NOTIFICATIONS;