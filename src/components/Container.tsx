import React from "react";

interface containerTypes {
  children: JSX.Element | JSX.Element[],
  className?: string | undefined
}

const Container: React.FC<containerTypes> = ({
  children,
  className
}) => {
  return (
    <div className={`mx-auto max-w-7xl min-h-screen ${className}`}>
      {children}
    </div>
  );
}

export default Container;