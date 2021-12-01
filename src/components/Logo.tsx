import React from "react";
import logoPrimary from '../assets/hestia-logo-primary.svg';
import logoWhite from '../assets/hestia-logo-white.svg';

interface logoTypes {
  size: string,
  color: "primary" | "white"
}

const Logo: React.FC<logoTypes> = ({
  size,
  color
}) => {
  return (
    <div>
      {color === "primary" && <img src={logoPrimary} alt="logo-primary" height={size} width={size}/>}
      {color === "white" && <img src={logoWhite} alt="logo-white" height={size} width={size}/>}
    </div>
  );
}

export default Logo;