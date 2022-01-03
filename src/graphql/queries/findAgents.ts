import { gql } from "@apollo/client";

const FIND_AGENTS = gql`
  query FindAgents($searchPhrase: String!) {
    findAgents(searchPhrase: $searchPhrase) {
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

export default FIND_AGENTS;