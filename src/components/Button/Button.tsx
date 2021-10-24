import React from 'react';
import './Button.scss';

interface ButtonProps {
  type?: string,
  disabled?: boolean,
  size?: string,
  children: JSX.Element
  className?: string,
  onClick: () => void;
}

const getButtonStyle = (
  type: string | undefined, 
  disabled: boolean | undefined, 
  size:string | undefined,
  className: string | undefined
): string => {
  let buttonClass: string = className + ' ';

  switch (type) {
    case 'primary': {
      buttonClass += 'button-primary ';
      break;
    }

    case 'transparent': {
      buttonClass += 'button-transparent ';
      break;
    }

    case 'outlined': {
      buttonClass += 'button-outlined '
      break;
    }

  }
  
  switch (size) {
    case 'small': {
      buttonClass += 'button-small ';
      break;
    }

    case 'medium': {
      buttonClass += 'button-medium ';
      break;
    }
    
    case 'large': {
      buttonClass += 'button-large ';
      break;
    }
  }

  if (disabled) buttonClass += 'button-disabled';

  return buttonClass;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  disabled = false,
  size = 'large',
  children,
  className = 'button',
  onClick
}) => {
  
  return (
    <button className={getButtonStyle(type, disabled, size, className)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;