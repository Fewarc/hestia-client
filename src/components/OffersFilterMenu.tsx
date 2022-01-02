import { FilterIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { offerFilters } from "../interfaces/OfferData";
import { getOfferCategories, getOfferTypes } from "../utility/NewOfferUtils";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import Input from "./Input";
import Modal from "./Modal";

interface FilterMenuProps {
  filters: offerFilters,
  setFilters: (filters: offerFilters) => void
}

const labelClass = classNames(
  'text-sm'
);

const OffersFilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  setFilters
}) => {
  const { t } = useTranslation();
  const [filterOpen, setFiltersOpen] = useState<boolean>(false);
  
  return (
    <div>
      <Modal open={filterOpen} onClickAway={() => setFiltersOpen(false)}>
        <div className="p-4" >
          <div className="w-full text-center">{t('offer.filters')}</div>
          <div className="flex flex-col gap-y-4">
            <Input 
              type="text"
              label={t('offer_filters.search_title')}
              value={filters.content || ''}
              onChange={e => setFilters({ ...filters, content: e.target.value })}
              className="border-opacity-100"
              willDisplayError={false}
            />
            <Input 
              type="text"
              label={t('offer_filters.search_address')}
              value={filters.address || ''}
              onChange={e => setFilters({ ...filters, address: e.target.value })}
              className="border-opacity-100"
              willDisplayError={false}
            />
            <div className="flex gap-8">
              <Input 
                type="number"
                label={t('offer_filters.price_low')}
                value={filters.priceLow?.toString() || ''}
                onChange={e => setFilters({ ...filters, priceLow: e.target.value })}
                className="border-opacity-100"
                willDisplayError={false}
              />
              <Input 
                type="number"
                label={t('offer_filters.price_high')}
                value={filters.priceHigh?.toString() || ''}
                onChange={e => setFilters({ ...filters, priceHigh: e.target.value })}
                className="border-opacity-100"
                willDisplayError={false}
              />
            </div>
            <div className="flex gap-8">
              <Input 
                type="number"
                label={t('offer_filters.area_low')}
                value={filters.areaLow?.toString() || ''}
                onChange={e => setFilters({ ...filters, areaLow: e.target.value })}
                className="border-opacity-100"
                willDisplayError={false}
              />
              <Input 
                type="number"
                label={t('offer_filters.area_high')}
                value={filters.areaHigh?.toString() || ''}
                onChange={e => setFilters({ ...filters, areaHigh: e.target.value })}
                className="border-opacity-100"
                willDisplayError={false}
              />
            </div>
            <div className="flex gap-8 justify-evenly">
              <div className="flex flex-col items-center">
                <div className={labelClass}>{t('offer_filters.type')}</div>
                <Dropdown 
                  fields={getOfferTypes(t)}
                  onFieldClick={field => setFilters({ ...filters, offerType: field })}
                  value={filters.offerType || ''}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className={labelClass}>{t('offer_filters.category')}</div>
                <Dropdown 
                  fields={getOfferCategories(t)}
                  onFieldClick={field => setFilters({ ...filters, category: field })}
                  value={filters.category || ''}
                />
              </div>
            </div>
            <div className="flex gap-8 justify-evenly">
              <div className="flex gap-8">
                <div>{t('offer_filters.furnished')}</div>
                <Checkbox 
                  value={filters.furnished || false}
                  onClick={() => setFilters({ ...filters, furnished: !filters.furnished })}
                />
              </div>
              <div className="flex gap-8">
                <div>{t('offer_filters.negotiable')}</div>
                <Checkbox 
                  value={filters.negotiable || false}
                  onClick={() => setFilters({ ...filters, negotiable: !filters.negotiable })}
                />
              </div>
            </div>
            <div className="flex gap-8">
              {/* <Input 
                type="number"
                label={t('offer_filters.floor')}
                value={filters.floor?.toString() || ''}
                onChange={e => setFilters({ ...filters, floor: e.target.value })}
                className="border-opacity-100"
                willDisplayError={false}
              /> */}
              <Input 
                type="number"
                label={t('offer_filters.numberOfRooms')}
                value={filters.numberOfRooms?.toString() || ''}
                onChange={e => setFilters({ ...filters, numberOfRooms: e.target.value })}
                className="border-opacity-100"
                willDisplayError={false}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Button 
        type="primary"
        onClick={() => setFiltersOpen(true)}
        children={<FilterIcon className="w-12 h-12"/>}
      />
    </div>
  );
}

export default OffersFilterMenu;