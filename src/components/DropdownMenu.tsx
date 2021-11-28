import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface dropdownMenuTypes {
  buttonChildren: JSX.Element | JSX.Element[] | string,
  dropdownChidren: JSX.Element | JSX.Element[] | string,
}

const DropdownMenu: React.FC<dropdownMenuTypes> = ({
  buttonChildren,
  dropdownChidren
}) => {
  const node = useRef<HTMLHeadingElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setMenuOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button 
        type='link'
        onClick={() => setMenuOpen(!menuOpen)}
        children={buttonChildren}
      />
      {menuOpen && 
        <div className='absolute' ref={node}>
          {dropdownChidren}
        </div>
      }
    </div>
  );
}

export default DropdownMenu;