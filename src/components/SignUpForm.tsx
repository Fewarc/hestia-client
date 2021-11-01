import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import Input from "./Input";

const SignUpForm: React.FC<{
  account: string
}> = ({
  account
}) => {
  const [userData, setUserData] = useState<any>({
    userName: '',
    email: '',
    password: '',
    passwordRepeat: ''
  });
  const [errors, setErrors] = useState({
    userName: null,
    email: null,
    password: null,
    passwordRepeat: null
  });
  const { t } = useTranslation();

  const inputLabels = [
    t('sign_up_page.form.label.username'),
    t('sign_up_page.form.label.e_mail'),
    t('sign_up_page.form.label.password'),
    t('sign_up_page.form.label.repeat_password'),
  ];

  const checkAviability = (): boolean => {
    return false; // request here
  }

  const checkRestrains = (): boolean => {
    return false;
  }

  const submitForm = (): void => {
    

    if(checkRestrains()) {
      console.log('no errors');

    } else {
      console.log('errors');
    }
  }

  return (
    <div className="mx-auto">
      <div className="text-center text-5xl font-extrabold mb-12">
        <span>{t('sign_up_page.sign_up_form_title')}</span>
        <span>{t(`sign_up_page.${account}.title`)}</span>
      </div>
      <div className="max-w-md px-4 mx-auto">
        {Object.keys(userData).map((key, index) => 
          <Input 
            id={key}
            type={key.includes('password') ? 'password' : 'text'}
            value={userData[key]}
            label={inputLabels[index]}
            onChange={e => setUserData({ ...userData, [e.target.id]: e.target.value })}
          />)}
      </div>
      <div className="w-full mt-6 flex justify-center">
        <Button 
          type='primary'
          onClick={() => submitForm()}
          children={t('sign_up_page.form.button')}
          className=''
        />
      </div>
    </div>
  );
}

export default SignUpForm;