import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Spinner from "../components/Spinner";
import StaticMap from "../components/StaticMap";
import GET_AGENCY_DETAILS from "../graphql/queries/getAgencyDetails";
import { handleError } from "../utility/ErrorUtils";

const AgencyDetailsPage: React.FC = () => {
  const match = useRouteMatch<any>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: agencyData, loading: agencyLoading, error: agencyError } = useQuery(GET_AGENCY_DETAILS, {
    variables: {
      agencyId: parseInt(match.params.agencyId)
    },
    errorPolicy: 'all'
  });
  const agency = agencyData?.getAgencyDetails;
  const imageLink: string = agency && `https://avatars.dicebear.com/api/initials/${agency.firstName.replaceAll(' ', '.')}.svg`;

  useEffect(() => {
    handleError(agencyError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyError]);

  return (
    <Container>
      <div className="w-full min-h-screen relative">
        {agencyLoading ?
        <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
        <div className="pt-24">
          <div className="flex gap-10">
            <div className='h-80 w-80'>
              <img src={imageLink} alt='agency_image' className="h-full w-full rounded-md"/>
            </div>
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl font-black">
                {agency.firstName}
              </div>
              <div className="text-3xl">
                {t('agencies.username')}@{agency.login}
              </div>
              <div className="text-3xl">
                {t('agencies.contact')}{agency.email}
              </div>
            </div>
          </div>
          <div className="text-3xl mt-10">
            {t('agencies.based_at')}{agency.address}
          </div>
          <StaticMap 
            lat={agency.lat}
            lng={agency.lng}
            className="h-map w-full mb-16 mt-4"
          />
          <div className="flex justify-center mb-10">
            <Button 
              type="primary"
              onClick={() => null}
              children={<a href={`mailto: ${agency.email}`}>{t('agencies.contact_via_mail')}</a>}
            />
          </div>
        </div>}
      </div>
    </Container>
  );
}

export default AgencyDetailsPage;