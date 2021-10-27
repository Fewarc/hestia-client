import classNames from "classnames";
import React from "react";

interface buttonTypes {
  type: keyof typeof buttonStyles,
  size?: string | undefined,
  disabled?: boolean | undefined,
  className?: string | undefined,
  children?: JSX.Element | JSX.Element[] | undefined,
  onClick: () => void
}

const buttonStyles = {
  primary: 'border-2 border-primary rounded-xl px-4 py-2 font-medium text-primary hover:bg-primary hover:text-white transition duration-300',
  transparent: 'hover:opacity-50 transition duration-300',
  floating: ''
}

const getButtonStyles = (
  type: keyof typeof buttonStyles,
  size: string = 'md',
  disabled: boolean = false,
  className?: string
) => classNames(
  "cursor-pointer",
  className,
  buttonStyles[type]
);

const Button: React.FC<buttonTypes> = ({
  type,
  size,
  disabled,
  className,
  children,
  onClick
}) => {
  return (
    <button onClick={onClick} className={getButtonStyles(type, size, disabled, className)}>
      {children}
    </button>
  );
}

export default Button;