import classNames from "classnames";
import React from "react";
import Config from "../constants/Config";

interface inputTypes {
  id?: string,
  type: string,
  value: string,
  onChange: (e: any) => void, // pass the event object -> may switch to type later !! ?  !? ? !
  className?: string,
  label?: string | JSX.Element | JSX.Element[],
  error?: boolean,
  errorMessage?: string | null,
  disabled?: string,
  placeholder?: string,
  willDisplayError?: boolean,
}

const inputClass = classNames(
  'outline-none',
  'border-2 border-primary border-opacity-20',
  'rounded-md',
  'px-2 py-1',
  'focus:border-opacity-100 focus:border-primary',
  'transition duration-300',
  'w-full'
);

const labelClass = classNames(
  'text-sm',
  'mb-1',
  'ml-0.5'
);

const errorClass = classNames(
  'text-sm',
  'mt-1',
  'ml-0.5',
  'text-error',
  'mb-5'
);

const disabledClass = classNames(
  'opacity-50',
  'pointer-events-none'
);

const Input: React.FC<inputTypes> = ({
  id,
  type,
  value,
  onChange,
  className,
  label,
  error,
  errorMessage,
  disabled,
  placeholder,
  willDisplayError = true,
}) => {
  if(type === Config.INPUT_TYPE_NUMBER) {
    value = value.replace(/[^\d.-]/g, '');
  }

  return (
    <div className="w-full">
      {label && <div className={labelClass}>{label}</div>}
      <input 
        id={id}
        type={type}
        value={value}
        className={`${inputClass} ${className} ${disabled && disabledClass}`}
        spellCheck={false}
        placeholder={placeholder}
        onChange={(e: any) => onChange(e)}
      />
      {willDisplayError && <div className={`${error ? '' : 'invisible'} ${errorClass}`}>{errorMessage || Config.ERROR_ALERT}</div>}
    </div>
  );
}

export default Input;