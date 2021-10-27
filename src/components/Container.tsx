import React from "react";

interface containerTypes {
  children: JSX.Element | JSX.Element[]
}

const Container: React.FC<containerTypes> = ({
  children
}) => {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  );
}

export default Container;