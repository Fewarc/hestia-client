import { ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Config from "../constants/Config";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";

const LabeledField: React.FC<{
  label: string,
  content: string
}> = ({
  label,
  content
}) => {
    const { t } = useTranslation();

    return (
      <div className="flex flex-col gap-1">
        <div className="text-gray-300 text-sm">
          {label}
        </div>
        <div className="text-xl flex items-center">
          {content || t('account_info.not_completed')}
          {!content && <ExclamationIcon className="w-6 h-6 text-orange-500 ml-2" />}
        </div>
      </div>
    );
}

const AccoutnInfo: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector<UserType, UserType>(state => getUserData(state));

  console.log(user);
  

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex flex-col p-8'>
        <div className='text-3xl font-bold border-b border-gray-100 pb-4'>
          @{user.login}
        </div>
        <div className='h-full flex flex-col justify-evenly'>
          <div className="flex gap-32"> 
            <LabeledField  label={t('account_info.first_name')} content={user.firstName} />
            <LabeledField  label={t('account_info.last_name')} content={user.lastName} />
            <LabeledField  label={t('account_info.email')} content={user.email} />
          </div>
          <div className="flex gap-32"> 
            <LabeledField  label={t('account_info.account_role')} content={user.role} />
            {user.role === Config.ACCOUNT_NAME_AGENT && 
              <div className="flex gap-32"> 
                <LabeledField  label={t('account_info.rating')} content={(user.rating || t('account_info.none')!).toString()} />
                <LabeledField  label={t('account_info.agency')} content={(user.agencyId || t('account_info.not_joined')!).toString()} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccoutnInfo;