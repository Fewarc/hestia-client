import { TFunction } from "react-i18next";

export const getOfferCategories = (t: TFunction<"translation">): string[] => {
  return [
    t('offer_creation_page.offer_categories.agricultural'),
    t('offer_creation_page.offer_categories.residental'),
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