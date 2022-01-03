import { gql } from "@apollo/client";

const ACCEPT_AGENCY_INVITE = gql`
  mutation AcceptAgencyInvite($agentId: Float!, $agencyId: Float!, $notificationId: Float!) {
    acceptAgencyInvite(agentId: $agentId, agencyId: $agencyId, notificationId: $notificationId) {
      id
      senderId
      targetId
      content
      type
    }
  }
`;

export default ACCEPT_AGENCY_INVITE;