import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "./Input";

const SignUpForm: React.FC<{
  account: string
}> = ({
  account
}) => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const { t } = useTranslation();

  return (
    <div className="mx-auto">
      <div className="text-center text-5xl font-extrabold mb-12">
        <span>{t('sign_up_page.sign_up_form_title')}</span>
        <span>{t(`sign_up_page.${account}.title`)}</span>
      </div>
      <Input
        type="text"
        value="text value"
        label="label"
        error
        errorMessage="error message"
        className="max-w-1/2"
      />
    </div>
  );
}

export default SignUpForm;