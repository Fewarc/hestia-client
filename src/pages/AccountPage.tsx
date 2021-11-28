import { CalendarIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { Switch, useHistory } from "react-router";
import { Route } from "react-router-dom";
import AccountClendar from "../components/AccountCalendar";
import Button from "../components/Button";
import Container from "../components/Container";

const menuIconClass = classNames(
  'w-6 h-6',
  'mr-2'
);

const AccountPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className='w-full h-full flex'>
      <div className='flex flex-col py-48 px-20 shadow-md text-primary text-xl'>
        <Button 
          type='transparent'
          onClick={() => history.push('/account/calendar')}
          children={
            <div className='flex items-center'>
              <CalendarIcon className={menuIconClass}/>
              {t('account.menu.calendar')}
            </div>
          }
        />
      </div>
      <Container className='flex-grow'>
          <Switch>
            <Route path='/account/calendar' component={AccountClendar}/>
          </Switch>
      </Container>
    </div>
  );
}

export default AccountPage;