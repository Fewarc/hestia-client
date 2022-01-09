import { gql } from "graphql-tag";

const GET_USER_NOTIFICATIONS = gql`
  query Query($userId: Float!) {
    getUserNotifications(userId: $userId) {
      type
      content
      targetId
      senderId
      id
    }
  }
`

export default GET_USER_NOTIFICATIONS;