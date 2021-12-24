import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorAlerts, pushAlert } from "../actions/AlertsActions";
import { updateUser } from "../actions/UserActions";
import jwt_decode from "jwt-decode";
import UPDATE_USER_DATA from "../graphql/mutations/updateUserData";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";
import SpinnerInput from "./SpinnerInput";
import Config from "../constants/Config";

interface updateValuesProps {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
}

const AccountSettings: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector<UserType, UserType>(state => getUserData(state));
  const [ updateUserData, { data: updateData, loading: updateLoading, error: updateError } ] = useMutation(UPDATE_USER_DATA, { errorPolicy: 'all' });
  const [updateValues, setUpdateValues] = useState<updateValuesProps>({
    firstName: user.firstName, 
    lastName: user.lastName, 
    email: user.email, 
    age: user.age || 0, 
  });

  useEffect(() => {
    handleError(updateError, dispatch);
  }, [updateError])

  useEffect(() => {
    if (updateData?.updateUserData) {
      const token = jwt_decode(updateData?.updateUserData) as any
      const { user } = token;

      localStorage.setItem('token', updateData?.updateUserData);
      dispatch(updateUser(user));
      dispatch(clearErrorAlerts());
      dispatch(pushAlert({
        type: Config.INFO_ALERT,
        message: t('account_settings.success')
      }));
    }
  }, [updateData])

  return (
    <div className='w-full h-full p-10 pt-24 relative'>
      {updateLoading && <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
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
              onIncrement={() => setUpdateValues({ ...updateValues, age: parseInt(updateValues.age.toString()) + 1 })}
              onDecrement={() => setUpdateValues({ ...updateValues, age: parseInt(updateValues.age.toString()) - 1 })}
            />
          </div>
        </div>
        <div className="w-full flex justify-evenly">
          <Button 
            type='primary'
            onClick={() => updateUserData({
              variables: {
                userId: user.id,
                firstName: updateValues.firstName,
                lastName: updateValues.lastName,
                age: parseInt(updateValues.age.toString())
              }
            })}
            children={t('account_settings.save')}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;