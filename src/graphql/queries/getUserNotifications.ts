import { gql } from "graphql-tag";

const GET_USER_NOTIFICATIONS = gql`
  query Query($userId: Float!) {
    getUserNotifications(userId: $userId) {
      id
      userId
      content
      type
    }
  }
`

export default GET_USER_NOTIFICATIONS;