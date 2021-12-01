import React from "react";
import { useTranslation } from "react-i18next";
import HestiaLogo from "./HestiaLogo";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='h-64 w-full bg-primary p-8 text-white'>
      <div className='flex h-full'>
        <div className='flex items-center justify-evenly'>
          <HestiaLogo 
            color='white' 
            size='100' 
            className='text-6xl'
            logoOffset='-mt-1.5'
          />
        </div>
        <div className='flex-grow'>
          <div className='flex justify-evenly px-10'>
            <div className='text-xl'>
              {t('footer.agencies')}
            </div>
            <div className='text-xl'>
              {t('footer.offers')}
            </div>
            <div className='text-xl'>
              {t('footer.blog')}
            </div>
            <div className='text-xl'>
              {t('footer.terms')}
            </div>
            <div className='text-xl'>
              {t('footer.conditions')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;