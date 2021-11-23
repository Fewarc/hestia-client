import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import MapWithSearch from "../components/MapWithSearch";
import SpinnerInput from "../components/SpinnerInput";
import TextArea from "../components/TextArea";
import Image from "../components/Image";
import Config from "../constants/Config";
import { getCurrencies, getOfferCategories, getOfferTypes, isOfferDataValid } from "../utility/NewOfferUtils";
import { offerData } from "../interfaces/OfferData";
import { useDropzone } from "react-dropzone";
import { XIcon } from "@heroicons/react/outline";
import { ApolloError, useMutation } from "@apollo/client";
import CREATE_NEW_OFFER from "../graphql/mutations/createNewOffer";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";

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
  const [images, setImages] = useState<any[]>([]);
  const [createNewOffer, { error }] = useMutation(CREATE_NEW_OFFER, { errorPolicy: 'all' });
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFileChange = (file: any) => setImages([ ...images, file ]);
  const onDrop = useCallback(
    ([file]) => {
      onFileChange(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onFileChange]
  );
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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

  const publishOffer = (): void => {
    console.log(isOfferDataValid(offerData));
    if(isOfferDataValid(offerData)) {
      createNewOffer({variables: {
        title: offerData.title,
        description: offerData.description,
        offerType: offerData.offerType,
        category: offerData.category,
        furnished: offerData.furnished,
        area: parseFloat(offerData.area),
        floor: offerData.floor === Config.NOT_APPLICABLE ? null : parseInt(offerData.floor),
        numberOfRooms: offerData.numberOfRooms === Config.NOT_APPLICABLE ? null : parseInt(offerData.numberOfRooms),
        price: parseFloat(offerData.price),
        currency: offerData.currency,
        negotiable: offerData.negotiable,
        address: offerData.address,
        lat: offerData.coordinates.lat,
        lng: offerData.coordinates.lng,
        files: images
      }})
    }
  }

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
              onIncrement={() => setOfferData({ ...offerData, numberOfRooms: (parseInt(offerData.numberOfRooms) + 1).toString() })}
              onDecrement={() => setOfferData({ ...offerData, numberOfRooms: (parseInt(offerData.numberOfRooms) - 1).toString() })}
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
          zoom={16}
          onSelect={({ lat, lng, address }) => setOfferData({ ...offerData, coordinates: { lat, lng }, address })}
          onChange={e => setOfferData({ ...offerData, address: e.target.value }) }
          onFocus={() => null}
          containerClassName='h-map w-full mb-16'
          searchBarClassName='w-11/12 mx-auto mb-2'
        />

        <div className='flex flex-col mb-2 mt-8 w-11/12'>
          <div className=''>{t('offer_creation_page.images')}</div>
        </div>
        {/* MIGHT MOVE IMAGE UPLOAD TO A SEPARATE COMPONENT */}
        <div className={`mt-2 border-2 p-2 cursor-pointer border-primary rounded-md w-full relative text-opacity-50 ${!images.length && 'h-32'}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <div className='w-full h-full grid grid-cols-5 gap-2'>
            {images.map(image => <Image file={image}/>)}
          </div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            {
              !images.length && (isDragActive ?
                <p className='opacity-20'>Drop the files here ...</p> :
                <p className='opacity-20'>Drag 'n' drop some files here, or click to select files</p>)
            }
          </div>
        </div>

        <div className='flex flex-wrap mb-4 w-full py-1 gap-x-4 gap-y-1 text-xs'>
          {images.map(image => (
            <div className='flex items-center border border-primary rounded-md pl-2 pr-1 py-0.5'>
              {image.path}
              <Button 
                type='transparent'              
                onClick={() => setImages([ ...images.filter(curImage => curImage.path !== image.path) ])}
                children={<XIcon className='h-3 w-3 ml-2 text-primary'/>}
              />
            </div>
          ))}
        </div>

        <div className='flex flex-col mb-8 mt-8 w-auto'>
          <Button
            type='primary'
            onClick={() => publishOffer()}
            children={t('offer_creation_page.publish_offer')}
          />
        </div>

      </div>
    </Container>
  );
}

export default OffersCreationPage;