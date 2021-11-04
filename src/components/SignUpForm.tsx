import { ApolloError, useMutation } from "@apollo/client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import INSERT_USER from "../graphql/mutations/insertUser";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";

interface userDataTypes {
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
}

interface errorTypes {
  username: string | null,
  email: string | null,
  password: string | null,
  passwordConfirm: string | null
}

const SignUpForm: React.FC<{
  account: string
}> = ({
  account
}) => {
  const [userData, setUserData] = useState<userDataTypes>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState<errorTypes>({
    username: null,
    email: null,
    password: null,
    passwordConfirm: null
  });
  const { t } = useTranslation();
  const history = useHistory();
  const [ insertUser, { data, loading, error }] = useMutation(INSERT_USER, { errorPolicy: 'all' });

  useEffect(() => {
    if(error) console.log(new ApolloError(error).message);
   }, [data, loading, error]);

  const inputLabels = [
    t('sign_up_page.form.label.username'),
    t('sign_up_page.form.label.e_mail'),
    t('sign_up_page.form.label.password'),
    t('sign_up_page.form.label.confirm_password'),
  ];

  const signUp = (): void => {
    insertUser({
      variables: {
        login: userData.username,
        email: userData.email,
        password: userData.password,
        role: account
      }
    })
    .then(res => {
      if(res?.data?.insertUser) history.push('/log-in');
    });
  }

  const isFormValid = (): boolean => {
    let errorMessages = {
      username: null,
      email: null,
      password: null,
      passwordConfirm: null
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

    if(userData.password !== userData.passwordConfirm) {
      errorMessages.passwordConfirm = t('sign_up_page.form.error_message.password.confirmed');
    }


    if(Object.values(errorMessages).some(value => value !== null)) {
      setErrors(errorMessages);
      return false;
    } else {
      setErrors({
        username: null,
        email: null,
        password: null,
        passwordConfirm: null
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
    <div className="mx-auto relative">
      {loading && <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"/>}
      <div className={`transition duration-500 ${loading && 'opacity-20 pointer-events-none'}`}>
        <div className="text-center text-5xl font-extrabold mb-12">
          <span>{t('sign_up_page.sign_up_form_title')}</span>
          <span>{t(`sign_up_page.${account}.title`)}</span>
        </div>
        <div className="max-w-md px-4 mx-auto">
          {Object.keys(userData).map((key, index) => 
            <Input 
              id={key}
              type={key.includes('password') ? 'password' : 'text'}
              value={userData[key as keyof userDataTypes]}
              label={inputLabels[index]}
              error={errors[key as keyof errorTypes] !== null}
              errorMessage={errors[key as keyof errorTypes]}
              onChange={e => setUserData({ ...userData, [e.target.id]: e.target.value.replaceAll(' ', '') })}
              className={classNames({'border-opacity-100': userData[key as keyof userDataTypes].length})}
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
    </div>
  );
}

export default SignUpForm;