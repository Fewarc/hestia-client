import classNames from "classnames";
import React from "react";

interface textAreaTypes {
  placeholder?: string,
  value?: string,
  disabled?: boolean,
  label?: string,
  onChange: (e: any) => void,
  className?: string
}

const textAreaClass = classNames(
  'outline-none',
  'border-2 border-primary',
  'rounded-md',
  'px-2 py-1',
  'focus:border-opacity-100 focus:border-primary',
  'transition duration-300',
  'text-xl',
);

const TextArea: React.FC<textAreaTypes> = ({
  placeholder,
  value,
  disabled,
  label,
  onChange,
  className
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div>{label}</div>
      <div 
        contentEditable={true}
        spellCheck={false}
        placeholder={placeholder}
        onChange={onChange}
        className={textAreaClass}
      />
    </div>
  );
}

export default TextArea;