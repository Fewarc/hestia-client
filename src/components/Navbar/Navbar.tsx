import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Config from '../../constants/Config';
import Button from '../Button/Button';
import Container from '../Container/Container';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Container>
        <div className="navbar-container">
          <div className="navbar-logo">
            {Config.hestia}
          </div>
          <div className="navbar-buttons">
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={<div>{t('blog')}</div>}
            />
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={<div>{t('agencies')}</div>}
            />         
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={<div>{t('oferts')}</div>}
            />
            <Button
              className="navbar-button"
              type='transparent'
              onClick={() => history.push('/')}
              children={<div>{t('log_in')}</div>}
            />
            <Button
              type='outlined'
              onClick={() => history.push('/')}
              children={<div>{t('sign_up')}</div>}
            />  
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;