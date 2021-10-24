import React from "react";
import logo from '../../assets/hestia-logo-v1.svg';
import Config from "../../constants/Config";
import './HestiaLogo.scss';

interface logoTypes {
  children?: JSX.Element | JSX.Element[] | string
}

const HestiaLogo: React.FC<logoTypes> = ({
  children
}) => {
  return (
    <div className="logo-container">
      <div className="logo">
        <img src={logo} alt="logo" height="50"/>
      </div>
      <h1>{Config.hestia}</h1>
    </div>
  );
}

export default HestiaLogo;