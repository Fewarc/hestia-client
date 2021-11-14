import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import Config from "../constants/Config";

interface inputTypes {
  id?: string,
  type?: string,
  value: string,
  onChange: (e: any) => void, // pass the event object -> may switch to type later !! ?  !? ? !
  onIncrement: () => void,
  onDecrement: () => void,
  className?: string,
  label?: string,
  error?: boolean,
  errorMessage?: string | null,
  disabled?: boolean,
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

const SpinnerInput: React.FC<inputTypes> = ({
  id,
  type,
  value,
  onChange,
  onIncrement,
  onDecrement,
  className,
  label,
  error,
  errorMessage,
  disabled,
  placeholder,
  willDisplayError = true
}) => {
  if(!disabled) value = value.replace(/[^\d.-]/g, '');

  return (
    <div className={`w-full flex ${inputClass} ${className} ${disabled && disabledClass}`}>
      {label && <div className={labelClass}>{label}</div>}
      <input 
        id={id}
        type={type}
        value={value}
        className='outline-none w-40'
        spellCheck={false}
        placeholder={placeholder}
        onChange={(e: any) => onChange(e)}
      />
      <div className='flex flex-col gap-y-1 justify-evenly ml-1 text-primary relative w-4'>
        <ChevronUpIcon className='w-4 h-4 cursor-pointer absolute top-0' onClick={onIncrement}/>
        <ChevronDownIcon className='w-4 h-4 cursor-pointer absolute bottom-0' onClick={onDecrement}/>
      </div>
      {willDisplayError && <div className={`${error ? '' : 'invisible'} ${errorClass}`}>{errorMessage || Config.ERROR_ALERT}</div>}
    </div>
  );
}

export default SpinnerInput;