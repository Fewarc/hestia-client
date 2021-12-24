import { gql } from "@apollo/client";

const UPDATE_USER_DATA = gql`
  mutation UpdateUserData($age: Float!, $email: String!, $lastName: String!, $firstName: String!, $userId: Float!) {
    updateUserData(age: $age, email: $email, lastName: $lastName, firstName: $firstName, userId: $userId)
  }
`;

export default UPDATE_USER_DATA;