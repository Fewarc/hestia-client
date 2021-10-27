import React from "react";
import logo from '../assets/hestia-logo-primary.svg';

interface logoTypes {
  size: string
}

const Logo: React.FC<logoTypes> = ({
  size
}) => {
  return (
    <div>
      <img src={logo} alt="logo-primary" height={size} width={size}/>
    </div>
  );
}

export default Logo;