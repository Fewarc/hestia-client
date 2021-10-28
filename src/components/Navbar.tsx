import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { normalizePath } from "../utility/PathUtils";
import Button from './Button';
import HestiaLogo from "./HestiaLogo";

const buttons = [
  'blog',
  'agencies',
  'oferts',
  'log_in'
]

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

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
          <Button 
            type="primary"
            size="md"
            onClick={() => history.push('/sign-up')}
            children={t("navbar.sign_up")}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;