import { TFunction } from "react-i18next";
import { offerData } from "../interfaces/OfferData";

export const getOfferCategories = (t: TFunction<"translation">): string[] => {
  return [
    t('offer_creation_page.offer_categories.agricultural'),
    t('offer_creation_page.offer_categories.residential'),
    t('offer_creation_page.offer_categories.commercial'),
    t('offer_creation_page.offer_categories.industrial'),
    t('offer_creation_page.offer_categories.raw_land'),
    t('offer_creation_page.offer_categories.special_use'),
  ];
}
export const getOfferTypes = (t: TFunction<"translation">): string[] => {
  return [
    t('offer_creation_page.offer_types.disposal'),
    t('offer_creation_page.offer_types.rent')
  ];
}

export const getCurrencies = (): string[] => {
  return [
    'USD',
    'EUR',
    'PLN'
  ];
}

export const isOfferDataValid = (offerData: offerData): boolean => {
  return (!!offerData.title.length && 
    !!offerData.description.length && 
    !!offerData.area.length && 
    !!offerData.price.length &&
    !!offerData.address.length &&
    !!offerData.floor.length &&
    !!offerData.numberOfRooms.length &&
    (offerData.coordinates.lat !== null) &&
    (offerData.coordinates.lng !== null));
}