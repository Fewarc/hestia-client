import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Logo from "../components/Logo";
import Config from "../constants/Config";
import { isUserLoggedIn } from "../selectors/UserSelector";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const userLoggedIn = useSelector<boolean, boolean>(state => isUserLoggedIn(state));

  return (
    <Container>
      <div className="pt-44 flex justify-center">
        <div className="flex flex-col">
          <div className="flex items-center font-pacifico text-8xl text-primary">
            <Logo size='200' color="primary" />
            <div className="">
              {Config.hestia}
            </div>
          </div>
          <div className="text-6xl mt-12 ml-10">
            {t('landing_page.first_section.main_header_text')}
            <span className="text-primary font-bold">{t('landing_page.first_section.main_everyone')}</span>
          </div>
          <div className="flex items-center text-4xl mt-32 justify-evenly">
            <Button 
              type="primary"
              onClick={() => history.push('/sign-up')}
              children={t('landing_page.join_now')}
              className="border-4"
            />
            <Button 
              type="primary"
              onClick={() => history.push(`${userLoggedIn ? '/account' : '/log-in'}`)}
              children={t('landing_page.log_in')}
              className="border-4"
            />
          </div>
          <div className="flex items-center mt-44 justify-evenly">
            <Button 
              type="transparent"
              onClick={() => history.push('/blog')}
              children={t('landing_page.blog')}
              className="border-b px-4"
            />
            <Button 
              type="transparent"
              onClick={() => history.push('/agencies')}
              children={t('landing_page.agencies')}
              className="border-b px-4"
            />
            <Button 
              type="transparent"
              onClick={() => history.push('/offers')}
              children={t('landing_page.offers')}
              className="border-b px-4"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;