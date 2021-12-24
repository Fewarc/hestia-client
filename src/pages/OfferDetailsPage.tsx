import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Container from "../components/Container";
import GET_OFFER_DETAILS from "../graphql/queries/getOfferDetails";
import { handleError } from "../utility/ErrorUtils";


const OfferDetailsPage: React.FC = () => {
  const match = useRouteMatch<any>();
  const dispatch = useDispatch();
  const { data: offerData, loading: offerLoading, error: offerError } = useQuery(GET_OFFER_DETAILS, {
    variables: {
      offerId: parseInt(match.params.offerId)
    },
    errorPolicy: 'all'
  });
  const offer = offerData?.getOfferDetails;

  useEffect(() => {
    handleError(offerError, dispatch);
  }, [offerError])

  return (
    <Container>
      <div className="pt-24">
        <div>
          {offer.title}
        </div>
      </div>
    </Container>
  );
}

export default OfferDetailsPage;