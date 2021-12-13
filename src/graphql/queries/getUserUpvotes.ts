import { gql } from "@apollo/client";

const GET_USER_UPVOTES = gql`
  query Query($userId: Float!) {
    getUserUpvotes(userId: $userId)
  }
`;

export default GET_USER_UPVOTES;