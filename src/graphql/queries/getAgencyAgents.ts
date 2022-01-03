import { gql } from "@apollo/client";

const GET_AGENTS = gql`
  query GetAgnecyAgents($agencyId: Float!) {
    getAgnecyAgents(agencyId: $agencyId) {
      agent {
        firstName
        id
        login
        email
        role
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
        lastLogIn
      }
      saleLevels
      totalClients
    }
  }
`;

export default GET_AGENTS;