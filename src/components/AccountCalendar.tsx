import React from "react";
import { useTranslation } from "react-i18next";

const AccountClendar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-full pt-20 flex flex-col'>
      <div className='text-3xl font-thin'>
        {t('calendar.your')}
      </div>
      <div>

      </div>
    </div>
  );
}

export default AccountClendar;