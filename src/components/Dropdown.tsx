import { ChevronDownIcon } from "@heroicons/react/outline";
import classNames from "classnames";
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

const iconClass = classNames(
  'w-7',
  'h-7',
  'inline',
  'ml-2',
  'transition',
  'transform',
  'duration-500'
);

const Dropdown: React.FC<dropdownTypes> = ({
  fields,
  disabled = false,
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

  useEffect(() => {
    setOpen(false);
  }, [value]);

  return (
    <div className={`relative text-xl border-2 w-56 rounded-md px-3 py-0.5 border-primary ${disabled && 'opacity-20 pointer-events-none'} ${className}`} ref={node}>
      <Button 
        type='link'
        onClick={() => setOpen(!open)}
        className='w-full'
        children={
          <div className='flex items-center justify-between'>
            <span className='font-bold'>{value}</span>
            <ChevronDownIcon className={`${iconClass} ${open && 'rotate-180'}`}/>
          </div>
        }
      />
      <div className={open ? 'block' : 'hidden'}>
        <div className='flex flex-col items-start'>
          {fields.map(field => (
            <Button 
              key={field}
              type='transparent'
              onClick={() => onFieldClick(field)}
              children={field}
              className='mt-2'
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;