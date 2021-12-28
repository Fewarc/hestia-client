import { gql } from "@apollo/client";

const UPDATE_USER_DATA = gql`
  mutation UpdateUserData($lng: Float!, $lat: Float!, $address: String!, $age: Float!, $email: String!, $lastName: String!, $firstName: String!, $userId: Float!) {
    updateUserData(lng: $lng, lat: $lat, address: $address, age: $age, email: $email, lastName: $lastName, firstName: $firstName, userId: $userId)
  }
`;

export default UPDATE_USER_DATA;