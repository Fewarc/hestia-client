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
  label?: string | undefined,
  width?: string
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
  width = 'w-56'
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLHeadingElement>(null);

  const dropdownButtonClass = classNames(
    'realative',
    'text-xl',
    'border-2 border-primary',
    'rounded-md',
    'px-3 py-1',
    {
      'border-b-0': open,
      'rounded-b-none': open,
      'mb-0.5': open
    }
  );

  const dropdownMenuClass = classNames(
    'border-2',
    'rounded-b-md',
    'border-t-0',
    'bg-white',
    'z-50',
    'px-3',
    'border-primary',
    '-ml-3.5',
    {
      'hidden': !open,
      'absolute': open
    }
  );

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
    <div className={`${dropdownButtonClass} ${width} ${disabled && 'opacity-20 pointer-events-none'} ${className}`} ref={node}>
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
      <div className={`${dropdownMenuClass} ${width}`}>
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