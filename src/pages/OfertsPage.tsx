import React, { useState } from "react";
import Container from "../components/Container";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Button from "../components/Button";
import OfertsFilterMenu from "../components/OfertsFilterMenu";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/outline";
import { usePixelBreakpoint } from "../utility/Hooks";

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

const OfertsPage: React.FC = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const { t } = useTranslation();
  const addMargin = usePixelBreakpoint(1400);

  return (
    <div className='w-full h-screen flex'>
      <div className={`flex-grow mt-20 ${addMargin && '-mr-28'}`}>
        <div className='max-w-7xl flex mx-auto'>

          <div>CATEGORY</div>{/** MENU HERE */}

          <div className={addOfertClass}>
            <div className='flex-grow flex items-center justify-center border-primary border-2 border-dashed rounded-xl p-4'>
              <div className='text-2xl font-bold text-primary mr-4'>
                {t('oferts_page.add_new_ofert')}
              </div>
              <PlusIcon className={iconClass}/>
            </div>
          </div>
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

export default OfertsPage;