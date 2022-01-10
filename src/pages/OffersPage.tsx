/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useQuery } from "@apollo/client";
import GET_OFFERS from "../graphql/queries/getOffers";
import OfferCard from "../components/OfferCard";
import GET_THUMBNAILS from "../graphql/queries/getThumbnails";
import { handleError } from "../utility/ErrorUtils";
import { offerFilters } from "../interfaces/OfferData";
import OffersFilterMenu from "../components/OffersFilterMenu";

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
  'transition duration-500',
  'opacity-20 hover:opacity-100',
  'cursor-pointer',
);

const offerContainer = classNames(
  'w-full',
  'ml-16',
  'transition duration-500',
);

const OffersPage: React.FC = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const isLoggedIn = useSelector<boolean, boolean>(state => isUserLoggedIn(state));
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const addMargin = usePixelBreakpoint(1400);
  const [offerFilters, setOfferFilters] = useState<offerFilters>({
    content: '',
    priceLow: null,
    priceHigh: null,
    areaLow: null,
    areaHigh: null,
    offerType: null,
    category: null,
    furnished: null,
    floor: null,
    numberOfRooms: null,
    negotiable: null,
    address: null
  })
  const { 
    data: offerData, 
    loading: offersLoading, 
    error: offerError, 
    refetch: refetchOffers 
  } = useQuery(GET_OFFERS, { 
    variables: {
      content: offerFilters.content,
      priceLow: offerFilters.priceLow ? parseInt(offerFilters.priceLow?.toString()) : null,
      priceHigh: offerFilters.priceHigh ? parseInt(offerFilters.priceHigh?.toString()) : null,
      areaLow: offerFilters.areaLow ? parseInt(offerFilters.areaLow?.toString()) : null,
      areaHigh: offerFilters.areaHigh ? parseInt(offerFilters.areaHigh?.toString()) : null,
      offerType: offerFilters.offerType,
      category: offerFilters.category,
      furnished: offerFilters.furnished,
      negotiable: offerFilters.negotiable,
      numberOfRooms: parseInt(offerFilters.numberOfRooms?.toString() || '0'),
      address: offerFilters.address
    },
    errorPolicy: 'all' 
  });
  const { 
    data: thumbnailData, 
    loading: thumbnailLoading, 
    error: thumbnailError, 
    refetch: refetchThumbnails 
  } = useQuery(GET_THUMBNAILS, { errorPolicy: 'all' });
  
  useEffect(() => {
    (async () => {
      await refetchOffers();
      await refetchThumbnails();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleError(offerError, dispatch);
    handleError(thumbnailError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerError, thumbnailError]);

  return (
    <div className='w-full min-h-screen flex'>
      {/* ${addMargin && '-mr-28} */}
      <div className={`flex-grow mt-20 ${false && '-mr-28'}`}> 
        <div className='max-w-7xl flex mx-auto'>

          <OffersFilterMenu filters={offerFilters} setFilters={(filters: offerFilters) => setOfferFilters(filters)}/>

          <div className={offerContainer}>
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

            {(offersLoading || thumbnailLoading) ? 
              <div className='max-h-screen overflow-y-auto scrollbar-none animate-pulse'>
                {[ ...Array(6) ].map(() => 
                  <div className='w-full h-36 mt-2 border-2 border-gray-100 rounded-md flex'>
                    <div className='w-52 h-full bg-gray-100'></div>
                    <div className='flex-grow flex flex-col justify-evenly px-2'>
                      <div className='h-6 w-64 rounded-full bg-gray-100'></div>
                      <div className='h-4 w-48 rounded-full bg-gray-100'></div>
                      <div className='h-4 w-52 rounded-full bg-gray-100'></div>
                      <div className='h-4 w-36 rounded-full bg-gray-100'></div>
                    </div>
                  </div>
                )}
              </div> :
              <div className='max-h-screen overflow-y-auto scrollbar-none my-4'>
                {offerData?.getOffers?.map((offer: any) => 
                  <OfferCard
                    offer={offer} 
                    imageLink={thumbnailData?.getThumbnails?.find((thumbnail: any) => parseInt(offer.id) === thumbnail.offerId)?.imageLink}
                  />)
                }
              </div>
            }
          </div>

        </div>
      </div>
      {/* <div className='flex-grow-0 w-28'>
        <div className='h-full shadow-md flex items-center justify-evenly w-14 float-right'>
          <Button 
            type='transparent'
            onClick={() => setMapOpen(!mapOpen)}
            children={<ChevronLeftIcon className={`${iconClass} ${mapOpen && 'rotate-180'}`}/>}
          />
        </div>
         
      </div> */}
    </div>
  );
}

export default OffersPage;