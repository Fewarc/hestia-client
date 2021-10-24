import React from "react";
import logoPrimary from '../../assets/hestia-logo-primary.svg';
import logoWhite from '../../assets/hestia-logo-white.svg';

interface logoTypes {
  size?: string | undefined,
  color?: string | undefined
}

const Logo: React.FC<logoTypes> = ({
  size = "50",
  color = "primary"
}) => {
  return (
    <div>
      {color === 'primary' && <img src={logoPrimary} alt="logo" height={size}/>}
      {color === 'white' && <img src={logoWhite} alt="logo" height={size}/>}
    </div>
  );
}

export default Logo;