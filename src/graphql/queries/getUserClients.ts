import { gql } from "@apollo/client";

const GET_USER_CLIENTS = gql`
  query GetUserClients($agentId: Float!) {
    getUserClients(agentId: $agentId) {
      id
      login
      email
      role
      firstName
      lastName
      address
      lat
      lng
      age
      countryCode
      rating
      agencyId
      createdAt
      updatedAt
    }
  }
`;

export default GET_USER_CLIENTS;