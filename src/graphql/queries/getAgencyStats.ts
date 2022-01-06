import { gql } from "@apollo/client";

const GET_AGENCY_STATS = gql`
  query GetAgencyStats($agencyId: Float!) {
    getAgencyStats(agencyId: $agencyId) {
      totalClients
      saleLevels
      totalAgents
      messagesSentByAgents
      agentsMeetings
      agencyOffers
      offerCategories
    }
  }
`;

export default GET_AGENCY_STATS;