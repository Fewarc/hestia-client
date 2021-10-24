import React from 'react';

import './Container.scss';

interface ContainerProps {
  children: JSX.Element | JSX.Element[]
}

const Container: React.FC<ContainerProps> = ({
  children
}) => {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default Container;