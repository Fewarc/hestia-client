import React from "react";
import Config from "../constants/Config";
import Logo from "./Logo";

interface hestiaLogoTypes {
  size?: string | undefined
}

const HestiaLogo: React.FC<hestiaLogoTypes> = ({
  size = "50"
}) => {
  return (
    <div className="flex">
      <div>
        <Logo size={size}/>
      </div>
      <div className="flex items-center font-pacifico text-4xl text-primary">
        {Config.hestia}
      </div>
    </div>
  );
}

export default HestiaLogo;