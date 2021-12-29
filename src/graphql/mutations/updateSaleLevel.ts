import { gql } from "@apollo/client";

const UPDATE_SALE = gql`
  mutation UpdateSaleLevel($saleLevel: Float!, $clientId: Float!, $agentId: Float!) {
    updateSaleLevel(saleLevel: $saleLevel, clientId: $clientId, agentId: $agentId)
  }
`;

export default UPDATE_SALE;