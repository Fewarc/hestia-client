import { FilterIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { offerFilters } from "../interfaces/OfferData";
import Button from "./Button";
import Modal from "./Modal";

interface FilterMenuProps {
  filters: offerFilters,
  setFilters: (filters: offerFilters) => void
}

const OffersFilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  setFilters
}) => {
  const { t } = useTranslation();
  const [filterOpen, setFiltersOpen] = useState<boolean>(false);
  
  return (
    <div>
      <Modal open={filterOpen} onClickAway={() => setFiltersOpen(false)}>
        <div className="p-2" >
          <div className="w-full text-center">{t('offer.filters')}</div>
          <div className="flex flex-col">
            
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