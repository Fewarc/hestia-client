import React from 'react';

interface ButtonProps {
  type?: string,
  disabled?: boolean,
  size?: string,
  children: JSX.Element
  className: string,
  onClick: () => void;
}

const getButtonStyle = (
  type: string | undefined, 
  disabled: boolean | undefined, 
  size:string | undefined
): string => {
  return ''
}

const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  size,
  children,
  className,
  onClick
}) => {

  return (
    <button className={getButtonStyle(type, disabled, size)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;