import React, { useEffect, useRef } from "react";

interface ModalInterface {
  open: boolean,
  children: JSX.Element | JSX.Element[] | string,
  onClickAway: () => void,
  capWidth?: boolean
}

const Modal: React.FC<ModalInterface> = ({
  open,
  children,
  onClickAway,
  capWidth = true
}) => {
  const node = useRef<HTMLHeadingElement>(null);

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) onClickAway();
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
      {open && 
        <div className='fixed w-screen h-screen bg-gray-200 bg-opacity-20 top-0 left-0 z-50 backdrop-filter backdrop-blur'>
          <div ref={node} className={`absolute rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full ${capWidth && 'max-w-screen-sm'}`}>
            {children}
          </div>
        </div>
      }
    </div>
  );
}

export default Modal;