import React, { useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";

interface offerData {
  category: string
}

const getOfferCategories = (t: TFunction<"translation">) => {
  return [
    t('offer_creation_page.offer_categories.agricultural'),
    t('offer_creation_page.offer_categories.residental'),
    t('offer_creation_page.offer_categories.commercial'),
    t('offer_creation_page.offer_categories.industrial'),
    t('offer_creation_page.offer_categories.raw_land'),
    t('offer_creation_page.offer_categories.special_use'),
  ];
}

const OffersCreationPage: React.FC = () => {
  const { t } = useTranslation();
  const [offerData, setOfferData] = useState<offerData>({
    category: getOfferCategories(t)[0]
  }); 

  return (
    <Container>
      <div className='min-h-screen flex flex-col items-center w-full pt-32'>
        <div className='text-5xl font-extrabold text-center w-full'>{t('offer_creation_page.create_new_offer')}</div>
        <Dropdown 
          fields={getOfferCategories(t)}
          onFieldClick={(field) => setOfferData({ ...offerData, category: field })}
          value={offerData.category}
        />
      </div>
    </Container>
  );
}

export default OffersCreationPage;