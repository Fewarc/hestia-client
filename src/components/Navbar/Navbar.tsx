import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Button from '../Button/Button';
import Container from '../Container/Container';
import HestiaLogo from '../HestiaLogo/HestiaLogo';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Container>
        <div className="navbar-container">
          <div className="navbar-logo">
            <HestiaLogo />
          </div>
          <div className="navbar-buttons">
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={t('navbar.blog')}
            />
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={t('navbar.agencies')}
            />         
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={t('navbar.oferts')}
            />
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={t('navbar.log_in')}
            />
            <Button
              className="navbar-button"
              type='outlined'
              onClick={() => history.push('/')}
              children={t('navbar.sign_up')}
            />  
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;