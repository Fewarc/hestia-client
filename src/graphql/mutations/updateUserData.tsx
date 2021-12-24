import { gql } from "@apollo/client";

const UPDATE_USER_DATA = gql`
  mutation UpdateUserData($age: Float!, $lastName: String!, $firstName: String!, $userId: Float!) {
    updateUserData(age: $age, lastName: $lastName, firstName: $firstName, userId: $userId)
  }
`;

export default UPDATE_USER_DATA;