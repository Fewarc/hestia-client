import classNames from "classnames";
import React from "react";

interface inputTypes {
  id?: string | undefined,
  type: string,
  value: string,
  onChange: (e: any) => void, // pass the event object -> may switch to type later !! ?  !? ? !
  className?: string | undefined,
  label?: string | undefined,
  error?: boolean | undefined,
  errorMessage?: string | null | undefined,
  disabled?: string | undefined,
  placeholder?: string | undefined
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
  placeholder
}) => {
  const disabledClass = classNames(
    'opacity-50',
    'pointer-events-none'
  );

  return (
    <div className="w-full">
      <div className={labelClass}>{label}</div>
      <input 
        id={id}
        type={type}
        value={value}
        className={`${inputClass} ${className} ${disabled && disabledClass}`}
        spellCheck={false}
        placeholder={placeholder}
        onChange={(e: any) => onChange(e)}
      />
      <div className={`${error ? '' : 'invisible'} ${errorClass}`}>{errorMessage || 'error'}</div>
    </div>
  );
}

export default Input;