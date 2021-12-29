import { gql } from "@apollo/client";

const GET_SALE_LEVEL = gql`
  query Query($clientId: Float!) {
    getSaleLevel(clientId: $clientId)
  }
`;

export default GET_SALE_LEVEL;