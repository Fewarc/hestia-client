import { gql } from "@apollo/client";

const ADD_AS_CLIENT = gql`
  mutation Mutation($clientId: Float!, $agentId: Float!) {
    addAsClient(clientId: $clientId, agentId: $agentId)
  }
`

export default ADD_AS_CLIENT;