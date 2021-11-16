import classNames from "classnames";
import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface textAreaTypes {
  placeholder?: string,
  value: string,
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
  'resize-none',
  'w-full'
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
      <TextareaAutosize  
        onChange={onChange}
        value={value}
        className={textAreaClass}
      />
    </div>
  );
}

export default TextArea;