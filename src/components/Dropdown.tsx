import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface dropdownTypes {
  fields: string[],
  disabled?: boolean | undefined,
  className?: string | undefined,
  value?: string | undefined,
  onFieldClick: (field: string) => void,
  label?: string | undefined
}

const Dropdown: React.FC<dropdownTypes> = ({
  fields,
  disabled,
  className,
  value,
  onFieldClick,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLHeadingElement>(null);

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative ${disabled && 'opacity-20 pointer-events-none'} ${className}`} ref={node}>
      <Button 
        type='transparent'
        onClick={() => setOpen(!open)}
        children={value}
      />
      {open && (
        <div className='absolute'>
          {fields.map(field => (
            <Button 
              key={field}
              type='transparent'
              onClick={() => onFieldClick(field)}
              children={field}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;