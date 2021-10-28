import React from "react";

interface inputTypes {
  type: string,
  value: string,
  className?: string | undefined,
  label?: string | undefined,
  error?: boolean | undefined,
  errorMessage?: string | undefined,
  disabled?: string | undefined
}

const Input: React.FC<inputTypes> = ({
  type,
  value,
  className,
  label,
  error,
  errorMessage,
  disabled
}) => {
  return (
    <div>
      <div>{label}</div>
      <input 
        type={type}
        value={value}
        className={className}
      />
      <div className={error ? '' : 'hidden'}>{errorMessage}</div>
    </div>
  );
}

export default Input;