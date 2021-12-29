import { gql } from "@apollo/client";

const REMOVE_CLIENT = gql`
  mutation RemoveClient($clientId: Float!, $agentId: Float!) {
    removeClient(clientId: $clientId, agentId: $agentId)
  }
`;

export default REMOVE_CLIENT;