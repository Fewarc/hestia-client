import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router";
import Button from "../components/Button";
import Container from "../components/Container";
import { normalizePath } from "../utility/PathUtils";
import { ChevronRightIcon } from '@heroicons/react/solid';
import SignUpForm from "../components/SignUpForm";

const cardClass = classNames(
  'border-2 border-primary lg:border-opacity-20 hover:border-opacity-100',
  'transition duration-300',
  'p-8',
  'w-11/12 md:w-80 lg:w-96',
  'h-96',
  'rounded-md',
  'flex',
  'flex-col'
);

const iconClass = classNames(
  'w-4',
  'h-4'
);

const ProsList: React.FC<{
  pros: string[], 
}> = ({
  pros,
}) => (
  <div>
    {pros.map((pro: string) => 
      <div className="flex items-center">
        <ChevronRightIcon className={iconClass}/>
        <div>{pro}</div>
      </div>
    )} 
  </div>
);


const SignUpCard: React.FC<{
  title: string,
  content: string,
  buttonText: string,
  pros: string[],
  redirect: () => void
}> = ({
  title,
  content,
  buttonText,
  pros,
  redirect
}) => {
  return (
    <div className={cardClass}>
      <div className="text-3xl font-extrabold mb-4">
        {title}
      </div>
      <div className="flex-grow">
        {content}
      </div>
      <div className="flex-grow">
        <ProsList pros={pros}/>
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
  const match: any = useRouteMatch({
    path: "/sign-up/:account",
    exact: true
  });

  return (
    <Container>
      <div className="min-h-full flex pt-24 w-full">
        {match && Object.keys(match.params).includes('account') ? (
          <SignUpForm match={match} account={match.params.account}/>
        ) : (
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
              <SignUpCard 
                title={t(`sign_up_page.${account}.title`)}
                content={t(`sign_up_page.${account}.content`)}
                buttonText={t(`sign_up_page.${account}.button_text`)}
                pros={t(`sign_up_page.${account}.pros`).split(';')}
                redirect={() => history.push(normalizePath(`/sign-up/${account}`))}
              />
            ))}
          </div>
        </div>
        )}
      </div>
    </Container>
  );
}

export default SignUpPage;