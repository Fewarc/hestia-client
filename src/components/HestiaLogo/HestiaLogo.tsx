import React from "react";
import Logo from "./Logo";
import Config from "../../constants/Config";
import './HestiaLogo.scss';

interface hestiaLogoTypes {
  size?: string | undefined,
  color?: string | undefined,
  large?: boolean | undefined
}

const HestiaLogo: React.FC<hestiaLogoTypes> = ({
  size = "50",
  color = "primary",
  large = false
}) => {
  return (
    <div className="logo-container">
      <div className="logo">
        <Logo size={size} color={color}/>
      </div>
      <h1 className={`hestia-${color} ${large && 'large-hestia'}`}>{Config.hestia}</h1>
    </div>
  );
}

export default HestiaLogo;