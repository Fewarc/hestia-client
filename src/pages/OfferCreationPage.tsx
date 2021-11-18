import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import MapWithSearch from "../components/MapWithSearch";
import SpinnerInput from "../components/SpinnerInput";
import TextArea from "../components/TextArea";
import Config from "../constants/Config";
import { getCurrencies, getOfferCategories, getOfferTypes } from "../utility/NewOfferUtils";

interface offerData {
  title: string,
  description: string,
  category: string,
  furnished: boolean,
  area: string,
  floor: string,
  numberOfRooms: string,
  price: string,
  currency: string,
  negotiable: boolean,
  offerType: string,
  coordinates: {
    lat: number | null,
    lng: number | null
  },
  address: string
}

const OffersCreationPage: React.FC = () => {
  const { t } = useTranslation();
  const [offerData, setOfferData] = useState<offerData>({
    title: '',
    description: '',
    offerType: getOfferTypes(t)[0],
    category: getOfferCategories(t)[0],
    furnished: false,
    area: '',
    floor: '0',
    numberOfRooms: '0',
    price: '',
    currency: getCurrencies()[0],
    negotiable: false,
    coordinates: {
      lat: null,
      lng: null
    },
    address: ''
  }); 

  return (
    <Container>
      <div className='min-h-screen flex flex-col items-center w-full pt-32 text-xl'>
        <div className='text-5xl font-extrabold text-center w-full mb-8'>{t('offer_creation_page.create_new_offer')}</div>
        
        <div className='flex flex-col mb-8 w-11/12'>
          <div className='mb-2'>{t('offer_creation_page.title')}</div>
          <TextArea 
            value={offerData.title}
            onChange={e => setOfferData({ ...offerData, title: e.target.value })}
          />
        </div>
        
        <div className='flex flex-col mb-8 w-11/12'>
          <div className='mb-2'>{t('offer_creation_page.description')}</div>
          <TextArea 
            value={offerData.description}
            onChange={e => setOfferData({ ...offerData, description: e.target.value })}
          />
        </div>

        <div className='flex gap-8 mb-8'>
          <div className='flex items-center'>
            <div className='mr-4'>{t('offer_creation_page.offer_type')}</div>
            <Dropdown 
              fields={getOfferTypes(t)}
              onFieldClick={(field) => setOfferData({ ...offerData, offerType: field })}
              value={offerData.offerType}
            />
          </div>

          <div className='flex items-center'>
            <div className='mr-4'>{t('offer_creation_page.real_estate_category')}</div>
            <Dropdown 
              fields={getOfferCategories(t)}
              onFieldClick={(field) => setOfferData({ ...offerData, category: field })}
              value={offerData.category}
            />
          </div>

          <div className='flex items-center text-xl'>
            <div className='mr-4'>{t('offer_creation_page.furnished')}</div>
            <Checkbox 
              value={offerData.furnished}
              onClick={() => setOfferData({ ...offerData, furnished: !offerData.furnished })}
            />
          </div>
        </div>

        <div className='flex gap-8 mb-8'>
          <div className='flex items-center'>
            <div className='mr-4'>{t('offer_creation_page.area')}</div>
            <Input 
              type={Config.INPUT_TYPE_NUMBER}
              value={offerData.area}
              onChange={e => setOfferData({ ...offerData, area: e.target.value })}
              willDisplayError={false}
              className='border-opacity-100'
            />
            <div className='ml-2'>m<sup>2</sup></div>
          </div>

          <div className='flex items-center'>
            <Button 
              type='transparent'
              onClick={() => setOfferData({ ...offerData, floor: offerData.floor === Config.NOT_APPLICABLE ? '0' : Config.NOT_APPLICABLE })}
              children={<div className='mr-4'>{t('offer_creation_page.floor')}</div>}
            />
            <SpinnerInput 
              value={offerData.floor}
              onChange={e => setOfferData({ ...offerData, floor: e.target.value })}
              onIncrement={() => setOfferData({ ...offerData, floor: (parseInt(offerData.floor) + 1).toString() })}
              onDecrement={() => setOfferData({ ...offerData, floor: (parseInt(offerData.floor) - 1).toString() })}
              willDisplayError={false}
              disabled={offerData.floor === Config.NOT_APPLICABLE}
              className='border-opacity-100'
            />
          </div>

          <div className='flex items-center'>
            <Button 
              type='transparent'
              onClick={() => setOfferData({ ...offerData, numberOfRooms: offerData.numberOfRooms === Config.NOT_APPLICABLE ? '0' : Config.NOT_APPLICABLE })}
              children={<div className='mr-4'>{t('offer_creation_page.rooms')}</div>}
            />
            <SpinnerInput 
              value={offerData.numberOfRooms}
              onChange={e => setOfferData({ ...offerData, numberOfRooms: e.target.value })}
              onIncrement={() => setOfferData({ ...offerData, numberOfRooms: (parseInt(offerData.floor) + 1).toString() })}
              onDecrement={() => setOfferData({ ...offerData, numberOfRooms: (parseInt(offerData.floor) - 1).toString() })}
              willDisplayError={false}
              disabled={offerData.numberOfRooms === Config.NOT_APPLICABLE}
              className='border-opacity-100'
            />
          </div>
        </div>

        <div className='flex'>
          <div className='flex items-center'>
            <div className='mr-4'>{t('offer_creation_page.price')}</div>
            <Input 
              type={Config.INPUT_TYPE_NUMBER}
              value={offerData.price}
              onChange={e => setOfferData({ ...offerData, price: e.target.value })}
              willDisplayError={false}
              className='border-opacity-100'
            />
          </div>

          <div className='flex items-center'>
            <Dropdown 
              fields={getCurrencies()}
              onFieldClick={field => setOfferData({ ...offerData, currency: field })}
              value={offerData.currency}
              className='mr-1'
              width='w-28'
            />
            {offerData.offerType === t('offer_creation_page.offer_types.rent') && t('offer_creation_page.per_month')}
          </div>

          <div className='flex items-center'>
            <div className='mr-4 ml-8'>{t('offer_creation_page.negotiable')}</div>
            <Checkbox 
              value={offerData.negotiable}
              onClick={() => setOfferData({ ...offerData, negotiable: !offerData.negotiable })}
            />
          </div>
        </div>

        <div className='flex flex-col mb-2 mt-4 w-11/12'>
          <div className=''>{t('offer_creation_page.address')}</div>
        </div>
        
        <MapWithSearch 
          markers={[offerData.coordinates]}
          onClick={e => setOfferData({ ...offerData, coordinates: { lat: e.latLng.lat(), lng: e.latLng.lng() }})}
          zoom={4}
          onSelect={({ lat, lng, address }) => setOfferData({ ...offerData, coordinates: { lat, lng }, address })}
          onChange={e => setOfferData({ ...offerData, address: e.target.value }) }
          onFocus={() => null}
          containerClassName='h-map w-full mb-16'
          searchBarClassName='w-11/12 mx-auto mb-2'
        />

        <div className='flex flex-col mb-2 mt-8 w-auto'>
          <Button
            type='primary'
            onClick={() => null}
            children={t('offer_creation_page.publish_offer')}
          />
        </div>

      </div>
    </Container>
  );
}

export default OffersCreationPage;