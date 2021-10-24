import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/Container/Container";
import HestiaLogo from "../../components/HestiaLogo/HestiaLogo";
import './LandingPage.scss';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="landing-page">
      <Container size="xxl">
        <div className="first-section-container">
          <div className="left-section">{t("XD")}</div>
          <div className="right-section">
            <div className="first-section-logo">
              <HestiaLogo size="150" large/>
            </div>
            <div className="first-section-content">
              <span>
                <h1>{t("landing_page.first_section.main_header_text")}<span className="main-everyone">{t("landing_page.first_section.main_everyone")}</span></h1>
              </span>
              <p>
                {t("landing_page.first_section.main_paragraph_text")}
              </p>
              <div>
                {/* buttons here */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LandingPage;