import { useQuery } from "@apollo/client";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Carousel from "../components/Carousel";
import Container from "../components/Container";
import Config from "../constants/Config";
import GET_OFFER_DETAILS from "../graphql/queries/getOfferDetails";
import { parseDate } from "../utility/DateUtils";
import { handleError } from "../utility/ErrorUtils";

const BulletPoint: React.FC<{
  content: string | JSX.Element | JSX.Element[]
}> = ({
  content
}) => {
  return (
    <div className="flex items-center">
      <ChevronRightIcon className="w-4 h-4 text-primary" />
      <div>
        {content}
      </div>
    </div>
  );
}

const OfferDetailsPage: React.FC = () => {
  const match = useRouteMatch<any>();
  const { t } = useTranslation();
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
  }, [offerError]);

  console.log(offer);

  if (!offer) return null; 

  return (
    <Container>
      <div className="pt-24">
        <Carousel 
          images={offer?.photos}
        />
        <div className="flex flex-col mt-10">
          <div className="text-5xl font-bold">
            {offer?.title}
          </div>
          <div className="mt-4">
            {offer?.description}
          </div>
          <div className="text-3xl font-bold mt-10 mb-4">
            {t('offer.about')}
          </div>
          <div className="flex flex-col flex-wrap gap-y-2 mb-10">
            <BulletPoint 
              content={`${t(`offer.types.${offer.offerType}`)}`}
            />
            <BulletPoint 
              content={`${offer.price}${offer.currency} ${offer.offerType === Config.RENT ? t('offer.per_month') : ''}`}
            />
            <BulletPoint 
              content={`${offer.negotiable ? t('offer.is_negotiable') : t('offer.not_negotiable')}`}
            />
            <BulletPoint 
              content={<div className="flex gap-1">{`${t('offer.area')}`}<div>{offer.area} m<sup>2</sup></div></div>}
            />
            <BulletPoint 
              content={`${t('offer.category')} ${t(`offer.categories.${offer.category}`)}`}
            />
            {!!offer.floor && <BulletPoint 
              content={`${offer.floor} ${t('offer.floors')}`}
            />}
            {!!offer.numberOfRooms && <BulletPoint 
              content={`${offer.numberOfRooms} ${t('offer.rooms')}`}
            />}
            <BulletPoint 
              content={offer.furnished ? t('offer.is_furnished') : t('offer.not_furnished')}
            />
            <BulletPoint 
              content={`${t('offer.created_at')} ${parseDate(offer.createdAt)}`}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default OfferDetailsPage;