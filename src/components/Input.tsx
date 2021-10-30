import classNames from "classnames";
import React from "react";

interface inputTypes {
  type: string,
  value: string,
  onChange: any,
  className?: string | undefined,
  label?: string | undefined,
  error?: boolean | undefined,
  errorMessage?: string | undefined,
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
  'text-error'
);

const Input: React.FC<inputTypes> = ({
  type,
  value,
  onChange,
  className,
  label,
  error,
  errorMessage = "error",
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
        type={type}
        value={value}
        className={`${inputClass} ${className} ${disabled && disabledClass}`}
        spellCheck={false}
        placeholder={placeholder}
        onChange={() => onChange()}
      />
      <div className={`${error ? '' : 'invisible'} ${errorClass}`}>{errorMessage}</div>
    </div>
  );
}

export default Input;