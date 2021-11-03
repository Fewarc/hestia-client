import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import INSERT_USER from "../graphql/mutations/insertUser";
import Button from "./Button";
import Input from "./Input";

const SignUpForm: React.FC<{
  account: string
}> = ({
  account
}) => {
  const [userData, setUserData] = useState<any>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  });
  const [errors, setErrors] = useState<any>({
    username: null,
    email: null,
    password: null,
    passwordRepeat: null
  });
  const { t } = useTranslation();
  const [ insertUser, { data, loading, error }] = useMutation(INSERT_USER, { errorPolicy: 'all' });

  useEffect(() => {
    console.log(loading, data);
    if(error) console.log(JSON.stringify(error, null, 2));
   }, [data, loading, error]);

  const inputLabels = [
    t('sign_up_page.form.label.username'),
    t('sign_up_page.form.label.e_mail'),
    t('sign_up_page.form.label.password'),
    t('sign_up_page.form.label.repeat_password'),
  ];

  const signUp = (): void => {
    console.log('sign up:', userData); // request here
    try {
      insertUser({
        variables: {
          login: userData.username,
          email: userData.email,
          password: userData.password,
          role: account
        }
      })
    } catch (error) {
      console.error(error);      
    }
  }

  const isFormValid = (): boolean => {
    let errorMessages = {
      username: null,
      email: null,
      password: null,
      passwordRepeat: null
    };

    if(userData.username.length < 6) {
      errorMessages.username = t('sign_up_page.form.error_message.username.too_short');
    }

    if(!userData.email.includes('@') || !userData.email.includes('.')) {
      errorMessages.email = t('sign_up_page.form.error_message.email.email_invalid');
    }

    if(userData.password.toLowerCase() === userData.password) {
      errorMessages.password = t('sign_up_page.form.error_message.password.uppercase');
    }
    
    if(userData.password.length < 8) {
      errorMessages.password = t('sign_up_page.form.error_message.password.too_short');
    }

    if(userData.password !== userData.passwordRepeat) {
      errorMessages.passwordRepeat = t('sign_up_page.form.error_message.password.repeated');
    }


    if(Object.values(errorMessages).some(value => value !== null)) {
      setErrors(errorMessages);
      return false;
    } else {
      setErrors({
        username: null,
        email: null,
        password: null,
        passwordRepeat: null
      });
      return true;
    }
  }

  const submitForm = (): void => {
    if(isFormValid()) {
      signUp(); 
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
            error={errors[key] !== null}
            errorMessage={errors[key]}
            onChange={e => setUserData({ ...userData, [e.target.id]: e.target.value })}
          />)}
      </div>
      <div className="w-full mt-6 flex justify-center">
        <Button 
          type='primary'
          onClick={() => submitForm()}
          children={t('sign_up_page.form.button')}
          disabled={Object.values(userData).some(value => value === '')}
        />
      </div>
    </div>
  );
}

export default SignUpForm;