import classNames from "classnames";
import React from "react";
import Config from "../constants/Config";
import Logo from "./Logo";

interface hestiaLogoTypes {
  size?: string,
  color?: "primary" | "white",
  className?: string,
  logoOffset?: string
}

const HestiaLogo: React.FC<hestiaLogoTypes> = ({
  size = "50",
  color = "primary",
  className = "text-4xl",
  logoOffset = "-mt-0.5"
}) => {
  const textColor = classNames(
    {
      "text-primary": color === "primary",
      "text-white": color === "white",
    }
  );

  return (
    <div className={`flex ${className} ${textColor}`}>
      <div className={logoOffset}>
        <Logo color={color} size={size}/>
      </div>
      <div className="flex items-center font-pacifico">
        {Config.hestia}
      </div>
    </div>
  );
}

export default HestiaLogo;