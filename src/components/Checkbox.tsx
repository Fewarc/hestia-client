import classNames from "classnames";
import React from "react";
import { CheckIcon } from "@heroicons/react/outline";

interface checkboxTypes {
  value: boolean,
  disabled?: boolean | undefined,
  onClick: () => void 
}

const Checkbox: React.FC<checkboxTypes> = ({
  value,
  disabled = false,
  onClick
}) => {
  const checkboxClass = classNames(
    'w-7 h-7',
    'rounded-md',
    'border-2 border-primary',
    {
      'bg-primary': value,
      'bg-white': !value
    }
  );

  return (
    <button className={checkboxClass} onClick={onClick}>
      {value && <CheckIcon className='w-full h-full text-white'/>}
    </button>
  );
}

export default Checkbox;