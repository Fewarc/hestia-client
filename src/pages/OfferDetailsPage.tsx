import { useLazyQuery, useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import AgencyCard from "../components/AgencyCard";
import Badge from "../components/Badge";
import BlogPostCard from "../components/BlogPostCard";
import Button from "../components/Button";
import Carousel from "../components/Carousel";
import Container from "../components/Container";
import Spinner from "../components/Spinner";
import StaticMap from "../components/StaticMap";
import Config from "../constants/Config";
import GET_AGENCY_DETAILS from "../graphql/queries/getAgencyDetails";
import GET_OFFER_DETAILS from "../graphql/queries/getOfferDetails";
import GET_OFFER_POSTS from "../graphql/queries/getOfferRelatedPosts";
import { Post } from "../types/PostType";
import { extractTags } from "../utility/BlogUtils";
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
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: offerData, loading: offerLoading, error: offerError } = useQuery(GET_OFFER_DETAILS, {
    variables: {
      offerId: parseInt(match.params.offerId)
    },
    errorPolicy: 'all'
  });
  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_OFFER_POSTS, {
    variables: {
      offerId: parseInt(match.params.offerId)
    },
    errorPolicy: 'all'
  });
  const [ getAgency, { data: agencyData, error: agencyError } ] = useLazyQuery(GET_AGENCY_DETAILS, { errorPolicy: 'all' });
  const [ getAgent, { data: agentData, error: agentError } ] = useLazyQuery(GET_AGENCY_DETAILS, { errorPolicy: 'all' });
  const offer = offerData?.getOfferDetails;
  const posts = postsData?.getOfferRelatedPosts;
  const agency = agencyData?.getAgencyDetails;
  const agent = agentData?.getAgencyDetails;

  useEffect(() => {
    handleError(offerError, dispatch);
    handleError(postsError, dispatch);
    handleError(agencyError, dispatch);
    handleError(agentError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerError, postsError, agencyError, agentError]);

  useEffect(() => {
    if (offer?.agencyId) {
      getAgency({
        variables: {
          agencyId: offer.agencyId
        }
      });
    }
    if (offer?.agentId) {
      getAgent({
        variables: {
          agencyId: offer.agentId
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer]);

  return (
    <Container>
      <div className="w-full min-h-screen relative">
        {offerLoading || postsLoading ?
        <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
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
            <StaticMap 
              lat={offer.lat}
              lng={offer.lng}
              className="h-map w-full mb-16 mt-10"
            />
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
                content={`${offer.numberOfRooms} ${offer.numberOfRooms === 1 ? t('offer.room') : t('offer.rooms')}`}
              />}
              <BulletPoint 
                content={offer.furnished ? t('offer.is_furnished') : t('offer.not_furnished')}
              />
              <BulletPoint 
                content={`${t('offer.created_at')} ${parseDate(offer.createdAt)}`}
              />
            </div>
          </div>
          {!!agency && 
            <div className="flex flex-col">
              <div className="text-3xl font-bold mt-10 mb-4">{t('offer.agency')}</div>
              <AgencyCard agency={agency} />
            </div>
          }
          {!!agent &&
            <div className="flex items-center mt-10 mb-4 gap-4">
              <div className="text-3xl font-bold ">{t('offer.contact_via')}</div>
              <Button 
                type='transparent'
                onClick={() => history.push('/account/contacts')}
                children={
                  <div className="flex items-center gap-2 text-3xl text-primary">
                    <UserIcon className="text-primary w-8 h-8" />
                    <div>{!!agent.firstName && agent.firstName}</div>
                    <div>{!!agent.lastName && agent.lastName},</div>
                    <div>@{agent.login}</div>
                  </div>
                }
              />
            </div>
          }
          {!!posts?.length ? 
            <div className="text-3xl font-bold mt-10 mb-4">
              {t('offer.related_posts')}
            </div> :
            <div className="text-3xl font-bold mt-10 mb-4">
              {t('offer.no_posts')}
            </div>
          }
          <div className="grid grid-cols-5 gap-2 mb-10">
            {posts?.map((post: Post) => 
              <BlogPostCard
                title={post.title}
                description={post.description}
                tags={extractTags(post.tags).map(tag => <Badge content={tag} />)}
                upvotes={post.upvotes}
                date={post.postedAt}
                id={post.id}
              />
            )}
          </div>
          <div className="flex w-full justify-center mb-10">
            <Button 
              type="primary"
              onClick={() => history.push({
                pathname: '/new-post',
                state: {
                  relatedOffer: parseInt(offer.id)
                }
              })}
              children={t('offer.ask')}
            />
          </div>    
        </div>}
      </div>
    </Container>
  );
}

export default OfferDetailsPage;