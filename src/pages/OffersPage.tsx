import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/outline";
import { usePixelBreakpoint } from "../utility/Hooks";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../selectors/UserSelector";
import { ApolloError, useQuery } from "@apollo/client";
import GET_OFFERS from "../graphql/queries/getOffers";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import OfferCard from "../components/OfferCard";

const iconClass = classNames(
  'w-10',
  'h-10',
  'transition',
  'duration-1000',
  'transform',
  'text-primary'
);

const addOfertClass = classNames(
  'w-full',
  'ml-16',
  'transition duration-500',
  'opacity-20 hover:opacity-100',
  'cursor-pointer',
  'flex-grow'
);

const OffersPage: React.FC = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const isLoggedIn = useSelector<boolean, boolean>(state => isUserLoggedIn(state));
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const addMargin = usePixelBreakpoint(1400);
  const {data, loading, error} = useQuery(GET_OFFERS, { errorPolicy: 'all' });

  console.log(data);

  useEffect(() => {
    if(error) {
      dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(error).message
      }));
      console.log(JSON.stringify(error, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className='w-full h-screen flex'>
      <div className={`flex-grow mt-20 ${addMargin && '-mr-28'}`}>
        <div className='max-w-7xl flex mx-auto'>

          <div>CATEGORY</div>{/** MENU HERE */}

          {isLoggedIn && 
            <div className={addOfertClass} onClick={() => history.push('/new-offer')}>
              <div className='flex-grow flex items-center justify-center hover:border-solid border-primary border-2 border-dashed rounded-xl p-4'>
                <div className='text-2xl font-bold text-primary mr-4'>
                  {t('offers_page.add_new_offer')}
                </div>
                <PlusIcon className={iconClass}/>
              </div>
            </div>
          }

          {data.getOffers && data.getOffers.map((offer: any) => <OfferCard offer={offer}/>)}

        </div>
      </div>
      <div className='flex-grow-0 w-28'>
        <div className='h-full shadow-md flex items-center justify-evenly w-14 float-right'>
          <Button 
            type='transparent'
            onClick={() => setMapOpen(!mapOpen)}
            children={<ChevronLeftIcon className={`${iconClass} ${mapOpen && 'rotate-180'}`}/>}
          />
        </div>
          {/* GOOGLE MAP HERE IF OPEN */}
      </div>
    </div>
  );
}

export default OffersPage;