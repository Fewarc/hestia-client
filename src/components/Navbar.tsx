import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUserNavbarData, isUserLoggedIn } from "../selectors/UserSelector";
import { normalizePath } from "../utility/PathUtils";
import { UserIcon } from "@heroicons/react/outline";
import Button from './Button';
import HestiaLogo from "./HestiaLogo";
import classNames from "classnames";
import Notifications from "./Notifications";

const buttons = [
  'blog',
  'agencies',
  'oferts',
]

const iconClass = classNames(
  'w-8',
  'h-8',
  'inline',
  'ml-2'
);

interface UserData {
  userId: string | undefined,
  username: string | undefined
}

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const isLoggedIn = useSelector<boolean, boolean>(state => isUserLoggedIn(state));
  // const username = useSelector<string, string>(state => getUsername(state));
  const { userId, username } = useSelector<UserData, UserData>(state => getUserNavbarData(state));

  return (
    <div className="fixed w-full">
      <div className="flex max-w-7xl mx-auto py-4">
        <Button 
          type="link"
          size="md"
          onClick={() => history.push('/')}
          children={<HestiaLogo size="60"/>}
        />
        <div className="flex-grow flex justify-end">
          {buttons.map(button => (
            <div className="flex mr-24">
              <Button 
                type="transparent"
                size="md"
                onClick={() => history.push(normalizePath(`/${button}`))}
                children={t(`navbar.${button}`)}
              />
            </div>
          ))}
          {isLoggedIn && username && userId ? 
          (<div className="flex items-center">
            <Notifications userId={userId}/>
            <Button 
              type="transparent"
              onClick={() => history.push('/account')}
              children={
                <div className="text-primary font-semibold ml-8">
                  {username}
                  <UserIcon className={iconClass}/>
                </div>
              }
            />
          </div>) : 
          (<div>
            <Button 
              type="transparent"
              size="md"
              onClick={() => history.push('/log-in')}
              children={t("navbar.log_in")}
              className="mr-24"
            />
            <Button 
              type="primary"
              size="md"
              onClick={() => history.push('/sign-up')}
              children={t("navbar.sign_up")}
            />
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;