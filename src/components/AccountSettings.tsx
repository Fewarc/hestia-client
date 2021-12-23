import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";
import Button from "./Button";
import Input from "./Input";
import SpinnerInput from "./SpinnerInput";

interface updateValuesProps {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
}

const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector<UserType, UserType>(state => getUserData(state));
  const [updateValues, setUpdateValues] = useState<updateValuesProps>({
    firstName: user.firstName, 
    lastName: user.lastName, 
    email: user.email, 
    age: user.age || 0, 
  });

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex flex-col justify-between p-6'>
        <div>
          <div className="flex gap-32">
            <Input 
              label={t('account_settings.first_name')}
              type='text'
              value={updateValues.firstName}
              onChange={(e) => setUpdateValues({ ...updateValues, firstName: e.target.value })}
            />
            <Input 
              label={t('account_settings.last_name')}
              type='text'
              value={updateValues.lastName}
              onChange={(e) => setUpdateValues({ ...updateValues, lastName: e.target.value })}
            />
          </div> 
          <div className="flex gap-32">
            <Input 
                label={t('account_settings.email')}
                type='text'
                value={updateValues.email}
                onChange={(e) => setUpdateValues({ ...updateValues, email: e.target.value })}
              />
          </div>
          <div className="flex gap-32">
            <SpinnerInput 
                label={t('account_settings.age')}
                willDisplayError={false}
                type='number'
                value={updateValues.age?.toString()}
                onChange={(e) => setUpdateValues({ ...updateValues, age: e.target.value })}
                onIncrement={() => setUpdateValues({ ...updateValues, age: updateValues.age + 1 })}
                onDecrement={() => setUpdateValues({ ...updateValues, age: updateValues.age - 1 })}
              />
          </div>
        </div>
        <div className="w-full flex justify-evenly">
          <Button 
            type='primary'
            onClick={() => null}
            children={t('account_settings.save')}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;