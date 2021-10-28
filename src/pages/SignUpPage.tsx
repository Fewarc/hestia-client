import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import Button from "../components/Button";
import Container from "../components/Container";
import { normalizePath } from "../utility/PathUtils";

const cardClass = classNames(
  'border-2 border-primary border-solid lg:border-dashed hover:border-solid',
  'opacity-100 lg:opacity-50 hover:opacity-100',
  'transition duration-300',
  'p-8',
  'w-11/12 md:w-80 lg:w-96',
  'lg:h-96',
  'rounded-md',
  'flex',
  'flex-col'
);

const Card: React.FC<{
  title: string,
  content: string,
  buttonText: string,
  redirect: () => void
}> = ({
  title,
  content,
  buttonText,
  redirect
}) => {
  return (
    <div className={cardClass}>
      <div className="text-3xl font-extrabold mb-4">
        {title}
      </div>
      <div className="flex-grow mb-8">
        {content}
      </div>
      <Button 
        type='filled'
        size='md'
        onClick={redirect}
        children={buttonText}
        className="border-none"
      />
    </div>
  );
}

// same as in translations !!!
const accounts = ['user', 'agent', 'agency'];

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Container>
      <div className="min-h-full flex pt-24">
        <div className='flex flex-col flex-grow'>
          <div className="text-center py-14">
            <div className="text-5xl font-extrabold mb-6">
              <span>{t('sign_up_page.title_sign')}</span>
              <span className="text-primary">{t('sign_up_page.title_up')}</span>!
            </div>
            <div>
              <span>{t('sign_up_page.subtitle')}</span>
              <span>
                <Button 
                  type='link'
                  size='md'
                  onClick={() => history.push('/log-in')}
                  children={t('sign_up_page.log_in')}
                  className="underline"
                />
              </span>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center flex-grow gap-5'>
            {accounts.map(account => (
              <Card 
                title={t(`sign_up_page.${account}.title`)}
                content={t(`sign_up_page.${account}.content`)}
                buttonText={t(`sign_up_page.${account}.button_text`)}
                redirect={() => history.push(normalizePath(account))}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUpPage;